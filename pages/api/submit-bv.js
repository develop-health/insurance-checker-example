// pages/api/submit-bv.js

import { IncomingForm } from "formidable";
import fs from "fs/promises";

export const config = {
    api: {
        bodyParser: false, // We must disable the default bodyParser for formidable to handle multipart
    },
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // 1) Parse incoming form with formidable
        const form = new IncomingForm();

        // This returns a Promise that resolves with { fields, files }
        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, _fields, _files) => {
                if (err) reject(err);
                else resolve({ fields: _fields, files: _files });
            });
        });

        // 2) Convert front/back card images to base64 if present
        const insuranceImages = [];
        if (files.frontCardFile && files.frontCardFile.size > 0) {
            const frontBuffer = await fs.readFile(files.frontCardFile.filepath);
            const frontBase64 = frontBuffer.toString("base64");
            insuranceImages.push({ file_content: frontBase64 });
        }
        if (files.backCardFile && files.backCardFile.size > 0) {
            const backBuffer = await fs.readFile(files.backCardFile.filepath);
            const backBase64 = backBuffer.toString("base64");
            insuranceImages.push({ file_content: backBase64 });
        }

        // 3) Build your benefit-verification payload
        // The example uses some fields from `fields`:
        const payload = {
            drugs: [
                { name: "Wegovy", dosage: "0.25 mg", quantity: 28 },
                { name: "Zepbound", dosage: "2.5 mg", quantity: 28 },
                { name: "Ozempic", dosage: "0.25 mg", quantity: 28 },
                { name: "Mounjaro", dosage: "2.5 mg", quantity: 28 },
            ],
            diagnoses: [],
            insurance: insuranceImages, // base64 images
            patient: {
                internal_id: "some-internal-patient-id",
                first_name: fields.firstName || "",
                last_name: fields.lastName || "",
                date_of_birth: fields.dob || "",
                phone: fields.phone || "",
                address: {
                    street: fields.street || "",
                    city: fields.city || "",
                    state_province: fields.state || "",
                    zip_postal_code: fields.zip || "",
                    country: "USA",
                },
            },
            provider: {
                first_name: "Jane",
                last_name: "Green",
                address: {
                    street: "9071 E. Mississippi Ave",
                    city: "Denver",
                    state_province: "CO",
                    zip_postal_code: "80247",
                    country: "USA",
                },
                phone: "1231231234",
                npi: "0000000000",
            },
            entity: {
                legal_name: "Test Entity",
                tax_id: "111223333",
            },
            // Example: "mock_result": { "status": "completed", "case": "drugs_covered__prior_auth_required__has_copay" },
            use_patient_plan_fund_source_check: false,
        };

        // Compute BMI from height and weight if provided
        if (fields.height && fields.weight) {
            const heightInMeters = fields.height / 100; // assuming height is provided in centimeters
            const weightInKg = fields.weight;
            const bmi = weightInKg / (heightInMeters * heightInMeters);

            // Add obesity ICD-10 code if BMI is 30 or higher
            if (bmi >= 30) {
                payload.diagnoses.push({ code: "E66.9" }); // Obesity
            }
        }

        // (Optional) Add T2DM if user selected "yes"
        if (fields.hasT2DM === "yes") {
            payload.diagnoses.push({ code: "E11.9" }); // Type 2 diabetes
        }

        // 4) Make the server-side POST request
        //    "Authorization: Bearer <token>" should be replaced with a real token
        const response = await fetch("https://api.develophealth.io/benefit-verification", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer <token>", // replace <token> with your real token
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errText = await response.text();
            return res.status(response.status).json({ error: errText });
        }

        const data = await response.json();

        // 5) Return success back to the browser
        return res.status(200).json({
            message: "Benefit Verification Submitted",
            data,
        });
    } catch (err) {
        console.error("Error in /api/submit-bv:", err);
        return res.status(500).json({ error: err.message || "Server Error" });
    }
}
