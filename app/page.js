
export default function Home() {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold mb-4">GLP-1 Benefit Verification</h1>

      <p className="mb-6">
        Please fill out the form below to check your insurance coverage.
      </p>

      {/*
        We use a standard HTML <form> with `method="POST"` and
        `encType="multipart/form-data"` so the server can parse file uploads
        using formidable.
      */}
      <form
        className="space-y-6"
        action="/api/submit-bv"
        method="POST"
        encType="multipart/form-data"
      >
        {/* --- Patient Info --- */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Your Contact Info</h2>
          <label className="block mb-1 font-medium" htmlFor="firstName">
            First Name
          </label>
          <input
            className="border rounded w-full p-2"
            type="text"
            id="firstName"
            name="firstName"
            required
          />

          <label className="block mt-4 mb-1 font-medium" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="border rounded w-full p-2"
            type="text"
            id="lastName"
            name="lastName"
            required
          />

          <label className="block mt-4 mb-1 font-medium" htmlFor="dob">
            Date of Birth (YYYY-MM-DD)
          </label>
          <input
            className="border rounded w-full p-2"
            type="text"
            id="dob"
            name="dob"
            placeholder="1980-01-01"
            required
          />

          <label className="block mt-4 mb-1 font-medium" htmlFor="phone">
            Phone Number
          </label>
          <input
            className="border rounded w-full p-2"
            type="tel"
            id="phone"
            name="phone"
            required
          />
        </div>

        {/* --- Address --- */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="street">
            Street Address
          </label>
          <input
            className="border rounded w-full p-2"
            type="text"
            id="street"
            name="street"
            required
          />

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block mb-1 font-medium" htmlFor="city">
                City
              </label>
              <input
                className="border rounded w-full p-2"
                type="text"
                id="city"
                name="city"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="state">
                State
              </label>
              <input
                className="border rounded w-full p-2"
                type="text"
                id="state"
                name="state"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="zip">
                Zip Code
              </label>
              <input
                className="border rounded w-full p-2"
                type="text"
                id="zip"
                name="zip"
                required
              />
            </div>
          </div>
        </div>

        {/* --- Basic Health Info --- */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Basic Health Info</h2>
          <label className="block mb-1 font-medium" htmlFor="heightFeet">
            Height (feet)
          </label>
          <input
            className="border rounded w-full p-2"
            type="number"
            id="heightFeet"
            name="heightFeet"
            placeholder="e.g. 5"
          />

          <label className="block mt-4 mb-1 font-medium" htmlFor="heightInches">
            Height (inches)
          </label>
          <input
            className="border rounded w-full p-2"
            type="number"
            id="heightInches"
            name="heightInches"
            placeholder="e.g. 10"
          />

          <label className="block mt-4 mb-1 font-medium" htmlFor="weight">
            Weight (lbs)
          </label>
          <input
            className="border rounded w-full p-2"
            type="number"
            id="weight"
            name="weight"
            placeholder="e.g. 200"
          />

          <p className="mt-4 font-medium">Have you been diagnosed with Type 2 Diabetes?</p>
          <div className="flex items-center space-x-3 mt-2">
            <label className="inline-flex items-center space-x-1">
              <input
                className="form-radio"
                type="radio"
                name="hasT2DM"
                value="yes"
              />
              <span>Yes</span>
            </label>
            <label className="inline-flex items-center space-x-1">
              <input
                className="form-radio"
                type="radio"
                name="hasT2DM"
                value="no"
                defaultChecked
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* --- Insurance Info --- */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Insurance Info</h2>
          <label className="block mb-1 font-medium" htmlFor="providerName">
            Health Insurance Provider
          </label>
          <input
            className="border rounded w-full p-2"
            type="text"
            id="providerName"
            name="providerName"
            required
          />

          <label className="block mt-4 mb-1 font-medium" htmlFor="employerName">
            Employer
          </label>
          <input
            className="border rounded w-full p-2"
            type="text"
            id="employerName"
            name="employerName"
          />

          <label className="block mt-4 mb-1 font-medium" htmlFor="memberId">
            Member ID #
          </label>
          <input
            className="border rounded w-full p-2"
            type="text"
            id="memberId"
            name="memberId"
            required
          />

          <label className="block mt-4 mb-1 font-medium" htmlFor="groupNum">
            Group #
          </label>
          <input
            className="border rounded w-full p-2"
            type="text"
            id="groupNum"
            name="groupNum"
            required
          />

          <label className="block mt-4 mb-1 font-medium" htmlFor="rxBin">
            Rx BIN #
          </label>
          <input
            className="border rounded w-full p-2"
            type="text"
            id="rxBin"
            name="rxBin"
            required
          />

          <label className="block mt-4 mb-1 font-medium" htmlFor="rxGrp">
            Rx GRP (optional)
          </label>
          <input
            className="border rounded w-full p-2"
            type="text"
            id="rxGrp"
            name="rxGrp"
          />

          <label className="block mt-4 mb-1 font-medium" htmlFor="rxPcn">
            Rx PCN (optional)
          </label>
          <input
            className="border rounded w-full p-2"
            type="text"
            id="rxPcn"
            name="rxPcn"
          />

          <label className="block mt-4 mb-1 font-medium" htmlFor="insurancePhone">
            Pharmacy services phone # (optional)
          </label>
          <input
            className="border rounded w-full p-2"
            type="tel"
            id="insurancePhone"
            name="insurancePhone"
          />

          <label className="block mt-4 mb-1 font-medium" htmlFor="policyholderRelationship">
            Relationship to policyholder
          </label>
          <select
            className="border rounded w-full p-2"
            id="policyholderRelationship"
            name="policyholderRelationship"
          >
            <option value="">-- choose --</option>
            <option value="self">Self</option>
            <option value="spouse">Spouse</option>
            <option value="other">Other</option>
          </select>

          {/* Insurance card images */}
          <label className="block mt-6 mb-1 font-medium">
            Front of insurance card (optional)
          </label>
          <input
            className="block"
            type="file"
            name="frontCardFile"
            accept=".png,.jpg,.jpeg,.heic,.heif"
          />

          <label className="block mt-4 mb-1 font-medium">
            Back of insurance card (optional)
          </label>
          <input
            className="block"
            type="file"
            name="backCardFile"
            accept=".png,.jpg,.jpeg,.heic,.heif"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
