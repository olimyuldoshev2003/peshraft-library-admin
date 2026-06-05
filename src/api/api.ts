import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosRequest";

export const getFilterOrCategories = createAsyncThunk(
  "api/getFilterOrCategories",
  async () => {
    try {
      const { data } = await axiosRequest.get(
        `${import.meta.env.VITE_API_URL}/admin/filters`,
      );
      return data;
    } catch (error) {
      console.error("Error fetching filter or categories:", error);
      throw error;
    }
  },
);
