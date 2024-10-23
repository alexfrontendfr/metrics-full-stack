import React, { useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import api from "../../lib/api";

export default function NewMetric() {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/metrics", { name, value, timestamp });
      toast.success("Metric added successfully!");
      setName("");
      setValue("");
      setTimestamp("");
    } catch {
      toast.error("Failed to add metric.");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
<h1 className="text-2xl font-bold mb-4">Add New Metric</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Metric Name
            </label>
            <input
              type="text"
              id="name"
value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="value"
              className="block text-sm font-medium text-gray-700"
            >
Metric Value
            </label>
            <input
              type="number"
              id="value"
value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="timestamp"
              className="block text-sm font-medium text-gray-700"
            >
              Timestamp
            </label>
            <input
              type="datetime-local"
              id="timestamp"
value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
          >
            Add Metric
          </button>
        </form>
      </div>
    </Layout>
  );
}
