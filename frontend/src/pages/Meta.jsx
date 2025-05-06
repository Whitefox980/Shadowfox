import React, { useState } from "react";

function Meta() {
  const [target, setTarget] = useState("");
  const [metaList, setMetaList] = useState([]);

  const handleAdd = () => {
    if (target.trim()) {
      setMetaList([...metaList, target]);
      setTarget("");
    }
  };

  return (
    <div className="p-4 text-green-400">
      <h2 className="text-xl font-bold mb-4">Meta ciljevi</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Unesi meta URL ili IP"
          className="bg-black border border-green-600 text-green-300 px-2 py-1"
        />
        <button
          onClick={handleAdd}
          className="bg-green-700 text-black px-2 py-1"
        >
          Dodaj
        </button>
      </div>
      <ul className="space-y-1">
        {metaList.map((m, i) => (
          <li key={i} className="border-b border-green-700">{m}</li>
        ))}
      </ul>
    </div>
  );
}

export default Meta;
