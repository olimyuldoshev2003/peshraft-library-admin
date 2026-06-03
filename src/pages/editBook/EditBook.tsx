import { useState, useEffect } from "react";

// Img
import noImg from "../../assets/no-img.jpg";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { axiosRequest } from "../../utils/axiosRequest";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const EditBook = () => {
  const navigate = useNavigate();
  const { booksForEditing } = useAppSelector((state) => state.booksState);

  const [imgBook, setImgBook] = useState<any>(null);
  const [imgBgBook, setImgBgBook] = useState<any>(null);
  const [categoryValue, setCategoryValue] = useState<string>(
    booksForEditing?.category || "",
  );
  const [bookName, setBookName] = useState<string>(
    booksForEditing?.title || "",
  );
  const [publicationYear, setPublicationYear] = useState<string>(
    booksForEditing?.year?.toString() || "",
  );
  const [authorName, setAuthorName] = useState<string>(
    booksForEditing?.author || "",
  );
  const [pageSize, setPageSize] = useState<string>(
    booksForEditing?.page_count?.toString() ||
      booksForEditing?.pages?.toString() ||
      "",
  );
  const [language, setLanguage] = useState<string>(
    booksForEditing?.language || "",
  );
  const [availableCopies, setAvailableCopies] = useState<string>(
    booksForEditing?.available_copies?.toString() || "",
  );
  const [description, setDescription] = useState<string>(
    booksForEditing?.description || "",
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [filters, setFilters] = useState<any[]>([]);
  const [loadingFilters, setLoadingFilters] = useState<boolean>(false);

  // Snackbar states
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  // Get filters from API
  async function getFilters() {
    setLoadingFilters(true);
    try {
      const { data } = await axiosRequest.get(
        `${import.meta.env.VITE_API_URL}/admin/filters`,
      );
      setFilters(data.data.data || []);
    } catch (error) {
      console.error("Error fetching filters:", error);
      showSnackbar("Failed to load categories", "error");
    } finally {
      setLoadingFilters(false);
    }
  }

  useEffect(() => {
    getFilters();
  }, []);

  const handleBookImageChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        setImgBook(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleBookBgImageChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        setImgBgBook(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  function handleSubmitEditBook(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!bookName.trim()) {
      showSnackbar("Please enter book title", "warning");
      return;
    }

    if (!authorName.trim()) {
      showSnackbar("Please enter author name", "warning");
      return;
    }

    if (!categoryValue) {
      showSnackbar("Please select a category", "warning");
      return;
    }

    if (!publicationYear) {
      showSnackbar("Please enter publication year", "warning");
      return;
    }

    if (!pageSize) {
      showSnackbar("Please enter page count", "warning");
      return;
    }

    if (!availableCopies) {
      showSnackbar("Please enter available copies", "warning");
      return;
    }

    setShowConfirmDialog(true);
  }

  async function updateBook() {
    setLoading(true);
    setShowConfirmDialog(false);

    try {
      let updatedBook = {
        title: bookName,
        author: authorName,
        description: description,
        category: categoryValue,
        year: parseInt(publicationYear),
        available_copies: parseInt(availableCopies),
        image_url: imgBook || booksForEditing?.image_url,
        background_image: imgBgBook || booksForEditing?.background_image,
        page_count: parseInt(pageSize),
        language: language,
      };

      const { data } = await axiosRequest.put(
        `${import.meta.env.VITE_API_URL}/admin/books/${booksForEditing?.id}`,
        updatedBook,
      );

      console.log("Book updated successfully:", data);
      showSnackbar("Book updated successfully!", "success");

      setTimeout(() => {
        navigate("/dashboard/books");
      }, 2000);
    } catch (error: any) {
      console.error("Error updating book:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update book. Please try again.";
      showSnackbar(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  }

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "warning" | "info",
  ) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  if (!booksForEditing) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div className="edit_book_component px-4 py-4">
        <div className="edit_book_component_block">
          <form
            className="form_edit_book flex sm:flex-col lg:flex-row lg:justify-center lg:items-end gap-10"
            onSubmit={handleSubmitEditBook}
          >
            <div className="block_img_book_and_bg_book_and_input_book_component flex sm:flex-row lg:flex-col sm:justify-center lg:justify-start sm:flex-wrap md:flex-nowrap gap-12">
              <div className="img_and_input_book flex flex-col gap-3">
                {imgBook ? (
                  <img
                    className="w-38.25 h-53.75 shadow-2xl object-contain rounded-[10px]"
                    src={imgBook}
                    alt=""
                  />
                ) : booksForEditing?.image_url ? (
                  <img
                    className="w-38.25 h-53.75 shadow-2xl object-cover rounded-[10px]"
                    src={booksForEditing.image_url}
                    alt=""
                  />
                ) : (
                  <img
                    className="w-38.25 h-53.75 shadow-2xl object-cover rounded-[10px]"
                    src={noImg}
                    alt=""
                  />
                )}
                <div className="label_and_input_book_img flex flex-col gap-1">
                  <label
                    htmlFor="edit_book_img"
                    className="text-[15px] text-[gray] cursor-pointer"
                  >
                    Book Image
                  </label>
                  <input
                    type="file"
                    className="rounded-[5px] max-w-55 outline-none px-3 shadow-xl py-1 bg-white cursor-pointer"
                    name=""
                    id="edit_book_img"
                    onChange={handleBookImageChange}
                  />
                </div>
              </div>
              <div className="img_bg_and_input_book flex flex-col gap-3">
                {imgBgBook ? (
                  <img
                    className="w-38.25 h-53.75 shadow-2xl object-contain rounded-[10px]"
                    src={imgBgBook}
                    alt=""
                  />
                ) : booksForEditing?.background_image ? (
                  <img
                    className="w-38.25 h-53.75 shadow-2xl object-cover rounded-[10px]"
                    src={booksForEditing.background_image}
                    alt=""
                  />
                ) : (
                  <img
                    className="w-38.25 h-53.75 shadow-2xl object-cover rounded-[10px]"
                    src={noImg}
                    alt=""
                  />
                )}
                <div className="label_and_input_book_bg_img flex flex-col gap-1">
                  <label
                    htmlFor="edit_book_bg_img"
                    className="text-[15px] text-[gray] cursor-pointer"
                  >
                    Book Background Image
                  </label>
                  <input
                    type="file"
                    className="rounded-[5px] max-w-55 outline-none px-3 shadow-xl py-1 bg-white cursor-pointer"
                    name=""
                    id="edit_book_bg_img"
                    onChange={handleBookBgImageChange}
                  />
                </div>
              </div>
            </div>
            <div className="labels_select_and_inputs_block">
              <div className="first_block grid sm:grid-cols-1 md:grid-cols-2 gap-10">
                <div className="label_input_book_name flex flex-col gap-2">
                  <label
                    htmlFor="edit_book_name"
                    className="cursor-pointer text-[15px] font-500"
                  >
                    Book Title
                  </label>
                  <TextField
                    id="edit_book_name"
                    label="Name of book"
                    variant="outlined"
                    value={bookName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setBookName(event.target.value)
                    }
                  />
                </div>
                <div className="label_select_book_category flex flex-col gap-2">
                  <label
                    htmlFor="edit_category"
                    className="cursor-pointer text-[15px] font-500"
                  >
                    Category
                  </label>

                  <FormControl fullWidth>
                    <InputLabel id="edit-demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="edit-demo-simple-select-label"
                      id="edit_category"
                      label="Category"
                      value={categoryValue}
                      onChange={(event: any) => {
                        setCategoryValue(event.target.value);
                      }}
                      disabled={loadingFilters}
                    >
                      <MenuItem
                        value={""}
                        sx={{
                          color: "gray",
                        }}
                      >
                        None
                      </MenuItem>
                      {loadingFilters ? (
                        <MenuItem disabled>Loading categories...</MenuItem>
                      ) : (
                        filters.map((filter: any) => (
                          <MenuItem key={filter.id} value={filter.filterName}>
                            {filter.filterName}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                </div>
                <div className="label_input_publication_year flex flex-col gap-2">
                  <label
                    htmlFor="edit_publication_year"
                    className="cursor-pointer text-[15px] font-500"
                  >
                    Publication Year
                  </label>
                  <TextField
                    id="edit_publication_year"
                    label="Publication Year"
                    variant="outlined"
                    type="number"
                    value={publicationYear}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPublicationYear(event.target.value)
                    }
                  />
                </div>
                <div className="label_input_author_name flex flex-col gap-2">
                  <label
                    htmlFor="edit_author_name"
                    className="cursor-pointer text-[15px] font-500"
                  >
                    Author
                  </label>
                  <TextField
                    id="edit_author_name"
                    label="Author Name"
                    variant="outlined"
                    value={authorName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setAuthorName(event.target.value)
                    }
                  />
                </div>
                <div className="label_input_page_size flex flex-col gap-2">
                  <label
                    htmlFor="edit_page-size"
                    className="cursor-pointer text-[15px] font-500"
                  >
                    Page Count
                  </label>
                  <TextField
                    id="edit_page-size"
                    label="Page Size"
                    variant="outlined"
                    type="number"
                    value={pageSize}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPageSize(event.target.value)
                    }
                  />
                </div>
                <div className="label_input_language flex flex-col gap-2">
                  <label
                    htmlFor="edit_language"
                    className="cursor-pointer text-[15px] font-500"
                  >
                    Language
                  </label>
                  <TextField
                    id="edit_language"
                    label="Language Name"
                    variant="outlined"
                    value={language}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setLanguage(event.target.value)
                    }
                  />
                </div>
                <div className="label_input_available_copies flex flex-col gap-2">
                  <label
                    htmlFor="available-copies"
                    className="cursor-pointer text-[15px] font-500"
                  >
                    Available Copies
                  </label>
                  <TextField
                    id="available-copies"
                    label="Available Copies"
                    variant="outlined"
                    type="number"
                    value={availableCopies}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setAvailableCopies(event.target.value)
                    }
                  />
                </div>
              </div>
              <div className="second_block flex flex-col gap-2 mt-4">
                <label htmlFor="edit_book_info">Summary Book</label>
                <textarea
                  id="edit_book_info"
                  placeholder="Book Information"
                  className="outline-none border-[3px] border-[#DFEAF2] rounded-[15px] p-1 h-52"
                  value={description}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setDescription(event.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <div className="block_btn_submit">
              <button
                type="submit"
                className="btn_submit bg-[#20ACFF] px-5 py-2 rounded-[15px] cursor-pointer text-[#FFFFFF] text-[19px] font-500 sm:w-full"
              >
                Update Book
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Update Book</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to update this book?</p>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p>
              <strong>Title:</strong> {bookName}
            </p>
            <p>
              <strong>Author:</strong> {authorName}
            </p>
            <p>
              <strong>Category:</strong> {categoryValue}
            </p>
            <p>
              <strong>Year:</strong> {publicationYear}
            </p>
            <p>
              <strong>Pages:</strong> {pageSize}
            </p>
            <p>
              <strong>Available Copies:</strong> {availableCopies}
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => setShowConfirmDialog(false)}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={updateBook}
            className="px-4 py-2 bg-[#20ACFF] text-white rounded-lg hover:bg-[#0d8ae0] transition-colors"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Confirm"
            )}
          </button>
        </DialogActions>
      </Dialog>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditBook;
