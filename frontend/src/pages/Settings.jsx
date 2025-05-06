import React, { useState } from "react";

function Settings() {
  const [config, setConfig] = useState({
    language: "sr",
    darkMode: true,
    autoSave: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setConfig({
      ...config,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="p-4 text-green-400">
      <h2 className="text-xl font-bold mb-4">Podešavanja sistema</h2>

      <div className="mb-3">
        <label>Jezik:</label>
        <select
          name="language"
          value={config.language}
          onChange={handleChange}
          className="ml-2 px-2 py-1 bg-black border border-green-700 text-green-300"
        >
          <option value="sr">Srpski</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="mb-3">
        <label>
          <input
            type="checkbox"
            name="darkMode"
            checked={config.darkMode}
            onChange={handleChange}
            className="mr-2"
          />
          Tamna tema
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="autoSave"
            checked={config.autoSave}
            onChange={handleChange}
            className="mr-2"
          />
          Automatsko čuvanje
        </label>
      </div>
    </div>
  );
}

export default Settings;
