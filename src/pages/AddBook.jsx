import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    description: "",
    publishedDate: "",
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("isbn", form.isbn);
    formData.append("description", form.description);
    if (form.publishedDate) {
      formData.append("publishedDate", new Date(form.publishedDate).toISOString());
    }
    if (image) {
      formData.append("image", image);
    }

    try {
      await api.post("/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/", { state: { refresh: true } });

      window.location.reload();
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-border shadow-md rounded">

      <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <Input
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <Input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />
        <Input
          name="isbn"
          placeholder="ISBN"
          value={form.isbn}
          onChange={handleChange}
          required
        />
        <Input
          name="publishedDate"
          type="date"
          placeholder="Published Date"
          value={form.publishedDate}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border border-gray-300 rounded p-2"
          rows="4"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" className="w-full bg-btn text-white hover:bg-hoverBtn">

          Submit Book
        </Button>
      </form>
    </div>
  );
}
