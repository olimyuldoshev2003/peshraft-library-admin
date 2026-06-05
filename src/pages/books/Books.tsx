import { HiOutlineSearch } from "react-icons/hi";
import userImg from "../../assets/user-img.svg";

// Icons
import TuneIcon from "@mui/icons-material/Tune";
import { LuPlus } from "react-icons/lu";
import { useEffect, useMemo, useState } from "react";

//Material UI
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { IoClose } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { MdDelete, MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { axiosRequest } from "../../utils/axiosRequest";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setBooksForEditing } from "../../reducers/booksState/booksState";

const Books = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<any>("title");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(17);

  const [modalFilter, setModalFilter] = useState<boolean>(false);
  const [modalShowAllFilters, setModalShowAllFilters] =
    useState<boolean>(false);
  const [modalFilterOptions, setModalFilterOptions] = useState<boolean>(false);
  const [modalDeleteBook, setModalDeleteBook] = useState<boolean>(false);

  // Filter functionalities states
  const [modalFilterAdd, setModalFilterAdd] = useState<boolean>(false);
  const [modalFilterEdit, setModalFilterEdit] = useState<boolean>(false);
  const [modalFilterDelete, setModalFilterDelete] = useState<boolean>(false);

  // Books
  const [books, setBooks] = useState<any>([]);
  const [searchInpValue, setSearchInpValue] = useState<string>("");
  const [loadingBooks, setLoadingBooks] = useState<boolean>(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [selectedFilterId, setSelectedFilterId] = useState<number | null>(null);
  const [totalBooksCount, setTotalBooksCount] = useState<number>(0);

  // Filters
  const [filtersOrCategories, setFiltersOrCategories] = useState<any>([]);
  const [loadingFiltersOrCategories, setLoadingFiltersOrCategories] =
    useState<boolean>(false);
  const [loadingAddFiltersOrCategories, setLoadingAddFiltersOrCategories] =
    useState<boolean>(false);
  const [loadingEditFiltersOrCategories, setLoadingEditFiltersOrCategories] =
    useState<boolean>(false);
  const [loadingDeleteFilter, setLoadingDeleteFilter] =
    useState<boolean>(false);
  const [loadingDeleteBook, setLoadingDeleteBook] = useState<boolean>(false);

  // Values of Input
  const [
    filterOrCategoryNameInpValueForAdding,
    setFilterOrCategoryNameInpValueForAdding,
  ] = useState<string>("");
  const [
    filterOrCategoryNameInpValueForEditing,
    setFilterOrCategoryNameInpValueForEditing,
  ] = useState<string>("");

  // Snackbar states
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    let aValue = a[orderBy];
    let bValue = b[orderBy];

    if (typeof aValue === "string" && typeof bValue === "string") {
      aValue = aValue.toLowerCase() as any;
      bValue = bValue.toLowerCase() as any;
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      if (bValue < aValue) return -1;
      if (bValue > aValue) return 1;
      return 0;
    }

    if (bValue < aValue) {
      return -1;
    }
    if (bValue > aValue) {
      return 1;
    }
    return 0;
  }

  type Order = "asc" | "desc";

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const headCells: any = [
    {
      id: "image_url",
      numeric: false,
      disablePadding: true,
      label: "Image",
      sortable: false,
    },
    {
      id: "title",
      numeric: false,
      disablePadding: true,
      label: "Book Title",
      sortable: true,
    },
    {
      id: "author",
      numeric: false,
      disablePadding: false,
      label: "Author",
      sortable: true,
    },
    {
      id: "category",
      numeric: false,
      disablePadding: false,
      label: "Category",
      sortable: true,
    },
    {
      id: "book_page",
      numeric: true,
      disablePadding: false,
      label: "Book Page",
      sortable: true,
    },
    {
      id: "year",
      numeric: false,
      disablePadding: false,
      label: "Year",
      sortable: true,
    },
    {
      id: "available_copies",
      numeric: false,
      disablePadding: false,
      label: "Available Copies",
      sortable: true,
    },
    {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
      sortable: false,
    },
  ];

  interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

  interface EnhancedTableToolbarProps {
    numSelected: number;
  }

  const handleRequestSort = (_: React.MouseEvent<unknown>, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = books.map((n: any) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () =>
      [...books]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, books],
  );

  function removeScrollbar() {
    document.body.classList.add("scroll_hidden_modal_filter_without_overlay");
    document.body.classList.remove(
      "scroll_visible_modal_filter_without_overlay",
    );
  }

  function showScrollbar() {
    document.body.classList.add("scroll_visible_modal_filter_without_overlay");
    document.body.classList.remove(
      "scroll_hidden_modal_filter_without_overlay",
    );
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      whiteSpace: "nowrap",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      whiteSpace: "nowrap",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  async function getBooks() {
    setLoadingBooks(true);
    try {
      const { data } = await axiosRequest.get(
        `${import.meta.env.VITE_API_URL}/admin/books?search=${searchInpValue}&page=${page + 1}&limit=${rowsPerPage}`,
      );

      console.log(data);
      
      setBooks(data.data || []);
      setTotalBooksCount(data.total || data.data?.length || 0);
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to load books", "error");
    } finally {
      setLoadingBooks(false);
    }
  }

  async function getFiltersByCategory() {
    setLoadingFiltersOrCategories(true);
    try {
      const { data } = await axiosRequest.get(
        `${import.meta.env.VITE_API_URL}/admin/filters`,
      );

      setFiltersOrCategories(data.filters);
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to load filters", "error");
    } finally {
      setLoadingFiltersOrCategories(false);
    }
  }

  async function addFilterOrCategory() {
    if (!filterOrCategoryNameInpValueForAdding.trim()) {
      showSnackbar("Please enter a filter name", "warning");
      return;
    }

    setLoadingAddFiltersOrCategories(true);
    try {
      const newFilter = {
        filterName: filterOrCategoryNameInpValueForAdding,
      };

      const { data } = await axiosRequest.post(
        `${import.meta.env.VITE_API_URL}/admin/filters`,
        newFilter,
      );

      console.log(data);

      showSnackbar("Filter added successfully", "success");
      setModalFilterAdd(false);
      setFilterOrCategoryNameInpValueForAdding("");
      getFiltersByCategory();
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to add filter", "error");
    } finally {
      setLoadingAddFiltersOrCategories(false);
    }
  }

  async function editFilterOrCategory() {
    if (!filterOrCategoryNameInpValueForEditing.trim()) {
      showSnackbar("Please enter a filter name", "warning");
      return;
    }

    if (!selectedFilterId) {
      showSnackbar("No filter selected", "error");
      return;
    }

    setLoadingEditFiltersOrCategories(true);
    try {
      const updatedFilter = {
        filterName: filterOrCategoryNameInpValueForEditing,
      };

      await axiosRequest.put(
        `${import.meta.env.VITE_API_URL}/admin/filters/${selectedFilterId}`,
        updatedFilter,
      );

      showSnackbar("Filter updated successfully", "success");
      setModalFilterEdit(false);
      setFilterOrCategoryNameInpValueForEditing("");
      setSelectedFilterId(null);
      getFiltersByCategory();
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to update filter", "error");
    } finally {
      setLoadingEditFiltersOrCategories(false);
    }
  }

  async function deleteFilterOrCategory() {
    if (!selectedFilterId) {
      showSnackbar("No filter selected", "error");
      return;
    }

    setLoadingDeleteFilter(true);
    try {
      await axiosRequest.delete(
        `${import.meta.env.VITE_API_URL}/admin/filters/${selectedFilterId}`,
      );

      showSnackbar("Filter deleted successfully", "success");
      setModalFilterDelete(false);
      setSelectedFilterId(null);
      getFiltersByCategory();
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to delete filter", "error");
    } finally {
      setLoadingDeleteFilter(false);
    }
  }

  async function deleteBook() {
    if (!selectedBookId) {
      showSnackbar("No book selected", "error");
      return;
    }

    setLoadingDeleteBook(true);
    try {
      await axiosRequest.delete(
        `${import.meta.env.VITE_API_URL}/admin/books/${selectedBookId}`,
      );

      showSnackbar("Book deleted successfully", "success");
      setModalDeleteBook(false);
      setSelectedBookId(null);
      getBooks();
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to delete book", "error");
    } finally {
      setLoadingDeleteBook(false);
    }
  }

  const handleSubmitAddingFilter = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    addFilterOrCategory();
  };

  const handleSubmitEditingFilter = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    editFilterOrCategory();
  };

  const openEditFilterModal = (filter: any) => {
    setSelectedFilterId(filter.id);
    setFilterOrCategoryNameInpValueForEditing(filter.filterName);
    setModalFilterEdit(true);
  };

  const openDeleteFilterModal = (filter: any) => {
    setSelectedFilterId(filter.id);
    setModalFilterDelete(true);
  };

  const openDeleteBookModal = (bookId: number) => {
    setSelectedBookId(bookId);
    setModalDeleteBook(true);
  };

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

  useEffect(() => {
    getFiltersByCategory();
  }, []);

  useEffect(() => {
    getBooks();
  }, [searchInpValue, page, rowsPerPage]);

  function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity,
              ),
          }),
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Books
        </Typography>
      </Toolbar>
    );
  }

  function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;

    const createSortHandler =
      (property: any) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell: any) => (
            <TableCell
              key={headCell.id}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.sortable !== false ? (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              ) : (
                headCell.label
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  return (
    <>
      <div className="books_component p-4 max-w-360 mx-auto">
        <div className="header_books flex justify-between items-center gap-6">
          <div className="search_logo_and_search_input relative flex items-center flex-1 gap-4">
            <HiOutlineSearch size={24} className="absolute top-2.5 left-3" />
            <input
              type="search"
              className="inp_search outline-none shadow-[0_0_6px_gray] pl-12 pr-4 py-2 rounded-[30px] text-[18px] font-500 sm:w-full md:w-[90%] lg:w-[80%]"
              placeholder="Search enter..."
              value={searchInpValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchInpValue(event.target.value);
                setPage(0);
              }}
            />
            <div className="btn_filter_and_modal_filter_overlay_transparent_block md:relative flex flex-col">
              <button
                className="icons_filter_block shadow-[0_0_6px_gray] flex justify-center items-center p-2 rounded-[10px] cursor-pointer"
                onClick={() => {
                  setModalFilter(true);
                  removeScrollbar();
                }}
              >
                <TuneIcon sx={{ fontSize: "26px" }} />
              </button>

              {/* Modal filter */}
              <div
                className={`modal_filter_transparent_overlay_main_block absolute sm:left-0 sm:w-full sm:top-13 md:top-13 md:-left-32 p-3 z-40 rounded-2xl duration-300
                md:w-77.5
                bg-white shadow-2xl
                ${modalFilter ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}
                `}
              >
                <div className="header_modal_filter flex justify-between items-center">
                  <h1 className="title_filter_modal text-[20px] font-500">
                    Filter Book
                  </h1>
                  <IoClose
                    size={31}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setModalFilter(false);
                      showScrollbar();
                    }}
                  />
                </div>
                <div className="section_modal_filter">
                  <div className="filter_by_category_block">
                    <h1 className="title_filter_by_category text-[#A1A1A1] text-[16px] font-400">
                      Category
                    </h1>
                    <div className="filter_by_category mt-1 grid grid-cols-2 gap-2">
                      {loadingFiltersOrCategories ? (
                        <CircularProgress size={24} />
                      ) : (
                        filtersOrCategories?.slice(0, 8)?.map((item: any) => {
                          return (
                            <div
                              key={item.id}
                              className="flex items-center gap-2"
                            >
                              <input
                                type="checkbox"
                                id={item.id}
                                className="outline-none cursor-pointer"
                              />
                              <label
                                className="text-[#6C757D] text-[13px] font-400 cursor-pointer"
                                htmlFor={item.id}
                              >
                                {item.filterName}
                              </label>
                            </div>
                          );
                        })
                      )}
                      {loadingFiltersOrCategories === false &&
                        filtersOrCategories.length === 0 && (
                          <h1>Filters not found</h1>
                        )}
                    </div>
                  </div>
                  <div className="btns_show_filters_and_filter_options flex justify-between mt-3 px-5">
                    <button
                      className="show_filters cursor-pointer outline-none text-[14px] font-400 text-green-500"
                      onClick={() => {
                        setModalShowAllFilters(true);
                        setModalFilter(false);
                      }}
                    >
                      Show All Filters
                    </button>
                    <button
                      className="filter_options cursor-pointer outline-none text-[14px] font-400 text-green-500"
                      onClick={() => {
                        setModalFilterOptions(true);
                        setModalFilter(false);
                      }}
                    >
                      Filter Options
                    </button>
                  </div>

                  <div className="btn_submit_block flex justify-end mt-2">
                    <button className="btn_submit_filter cursor-pointer px-5 py-1 text-[#FFFFFF] text-[18px] font-500 bg-[#20ACFF] rounded-[10px]">
                      Submit
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Show All Filters */}
              <Dialog
                open={modalShowAllFilters}
                onClose={() => {
                  setModalShowAllFilters(false);
                  showScrollbar();
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
                fullWidth
              >
                <div className="modal_show_all_filters_block px-4 py-4">
                  <DialogTitle id="alert-dialog-title">
                    Filter by Category
                  </DialogTitle>
                  <div className="filter_by_category mt-1 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {loadingFiltersOrCategories ? (
                      <CircularProgress size={24} />
                    ) : (
                      filtersOrCategories?.map((item: any) => {
                        return (
                          <div
                            key={item.id}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id={item.id}
                              className="outline-none cursor-pointer"
                            />
                            <label
                              className="text-[#6C757D] text-[13px] font-400 cursor-pointer"
                              htmlFor={item.id}
                            >
                              {item.filterName}
                            </label>
                          </div>
                        );
                      })
                    )}
                    {loadingFiltersOrCategories === false &&
                      filtersOrCategories.length === 0 && (
                        <h1>Filters not found</h1>
                      )}
                  </div>
                  <DialogActions>
                    <button
                      className="btn_submit_filter cursor-pointer px-5 py-1 text-[#FFFFFF] text-[18px] font-500 bg-[#20ACFF] rounded-[10px]"
                      onClick={() => {
                        setModalShowAllFilters(false);
                      }}
                    >
                      Submit
                    </button>
                  </DialogActions>
                </div>
              </Dialog>

              {/* Modal Filter Options */}
              <Dialog
                open={modalFilterOptions}
                onClose={() => {
                  setModalFilterOptions(false);
                  showScrollbar();
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
                fullWidth
              >
                <div className="modal_filter_options_block px-4 py-4">
                  <div className="header_modal_filter_options_block flex justify-between items-center">
                    <DialogTitle id="alert-dialog-title">
                      Filter Options
                    </DialogTitle>
                    <button
                      className="add_filter_btn flex items-center gap-1 bg-[#20ACFF] px-2.5 py-2.5 rounded-[10px] text-white text-[18px] font-500 cursor-pointer"
                      onClick={() => {
                        setModalFilterAdd(true);
                      }}
                    >
                      <LuPlus />
                    </button>
                  </div>

                  <div className="filter_functionalities_or_options">
                    <TableContainer>
                      <Table aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Filter name</StyledTableCell>
                            <StyledTableCell align="right">
                              Action
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {loadingFiltersOrCategories ? (
                            <TableRow>
                              <TableCell colSpan={2} align="center">
                                <CircularProgress size={24} />
                              </TableCell>
                            </TableRow>
                          ) : (
                            filtersOrCategories?.map((item: any) => {
                              return (
                                <StyledTableRow key={item.id}>
                                  <StyledTableCell>
                                    {item.filterName}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <div className="btn_func_block flex items-center gap-1.5">
                                      <AiFillEdit
                                        size={27}
                                        className="cursor-pointer text-blue-600 hover:text-blue-800 duration-100"
                                        onClick={() =>
                                          openEditFilterModal(item)
                                        }
                                      />
                                      <MdDelete
                                        size={27}
                                        className="cursor-pointer text-red-500 hover:text-red-600 duration-100"
                                        onClick={() =>
                                          openDeleteFilterModal(item)
                                        }
                                      />
                                    </div>
                                  </StyledTableCell>
                                </StyledTableRow>
                              );
                            })
                          )}
                          {loadingFiltersOrCategories === false &&
                            filtersOrCategories.length === 0 && (
                              <StyledTableRow>
                                <StyledTableCell colSpan={2} align="center">
                                  <h1>Filters not found</h1>
                                </StyledTableCell>
                              </StyledTableRow>
                            )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </Dialog>
            </div>
          </div>
          <div className="fullname_img_of_admin_and_admin_title sm:hidden md:flex items-center gap-3">
            <div className="fullname_of_user_and_admin_title">
              <h1 className="text-[22px] font-500">Suhrob H.</h1>
              <h1 className="text-[#808080] text-[15px] font-400 text-right">
                Admin
              </h1>
            </div>
            <img className="w-14 h-14" src={userImg} alt="User avatar" />
          </div>
        </div>

        <div className="section_books mt-7">
          <div className="title_filter_btn_add__book_block flex justify-between items-center gap-2">
            <h1 className="title_filter text-[24px] font-medium">
              Manage Books
            </h1>
            <div className="filter_and_btn_add_block flex justify-between items-center gap-6">
              <button
                className="flex items-center gap-2 bg-[#20ACFF] p-2.5 rounded-[10px] text-white text-[18px] font-500 cursor-pointer"
                onClick={() => {
                  navigate("/dashboard/add-book");
                }}
              >
                <LuPlus />
                <span className="sm:hidden md:block">Add new book</span>
              </button>
            </div>
          </div>

          <div className="table_books mt-6">
            <Paper
              sx={{
                width: "100%",
                paddingLeft: 3,
                paddingRight: 3,
                position: "relative",
                overflowX: "auto",
              }}
            >
              <EnhancedTableToolbar numSelected={selected.length} />
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={books.length}
                  />
                  <TableBody>
                    {visibleRows.map((book: any, index: number) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={book.id}
                        >
                          <TableCell>
                            <img
                              src={
                                book.image_url ||
                                "https://via.placeholder.com/40"
                              }
                              className="w-10 h-10 rounded-full object-cover"
                              alt="Book cover"
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {book.title}
                          </TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>{book.category}</TableCell>
                          <TableCell>{book.page_count}</TableCell>
                          <TableCell>{book.year}</TableCell>
                          <TableCell>{book.available_copies}</TableCell>
                          <TableCell>
                            <div className="btn_func_block flex items-center gap-1.5">
                              <AiFillEdit
                                size={27}
                                className="cursor-pointer text-blue-600 hover:text-blue-800 duration-100"
                                onClick={() => {
                                  dispatch(setBooksForEditing(book));
                                  navigate(`/dashboard/edit-book/`);
                                }}
                              />
                              <MdDelete
                                size={27}
                                className="cursor-pointer text-red-500 hover:text-red-600 duration-100"
                                onClick={() => openDeleteBookModal(book.id)}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {loadingBooks === false && books.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} align="center">
                          <h1>Book not found</h1>
                        </TableCell>
                      </TableRow>
                    )}
                    {loadingBooks && (
                      <TableRow>
                        <TableCell colSpan={8} align="center">
                          <CircularProgress size={40} />
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 8, 10, 17]}
                component="div"
                count={totalBooksCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>

        <div
          className={`transpartent_overlay_modal_filter absolute inset-0 ${modalFilter ? "pointer-events-auto" : "pointer-events-none"}`}
          onClick={() => {
            setModalFilter(false);
            showScrollbar();
          }}
        />

        {/* Modal Delete Book */}
        <Dialog
          open={modalDeleteBook}
          onClose={() => {
            setModalDeleteBook(false);
            setSelectedBookId(null);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <div className="modal_delete_book_block px-4 py-4">
            <div className="header_delete_book_block flex items-center gap-6 justify-between">
              <h1 className="text-[19px] font-600">Delete Book</h1>
              <button
                className="close_modal_btn outline-none cursor-pointer p-2 bg-[#D9D9D9] rounded-full"
                onClick={() => {
                  setModalDeleteBook(false);
                  setSelectedBookId(null);
                }}
              >
                <MdOutlineClose size={27} />
              </button>
            </div>
            <DialogTitle sx={{ fontSize: 17 }}>
              Are you sure you want to delete this book? This action cannot be
              undone.
            </DialogTitle>
            <div className="block_btns flex gap-2 justify-between sm:flex-col md:flex-row">
              <button
                className="bg-[#20ACFF] p-2.5 rounded-[10px] text-white text-[18px] font-500 cursor-pointer w-full duration-300"
                onClick={() => {
                  setModalDeleteBook(false);
                  setSelectedBookId(null);
                }}
                disabled={loadingDeleteBook}
              >
                No
              </button>
              <button
                className="bg-[red] p-2.5 rounded-[10px] text-white text-[18px] font-500 cursor-pointer w-full duration-300 disabled:opacity-50"
                onClick={deleteBook}
                disabled={loadingDeleteBook}
              >
                {loadingDeleteBook ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Yes"
                )}
              </button>
            </div>
          </div>
        </Dialog>

        {/* Modal Add Filter */}
        <Dialog
          open={modalFilterAdd}
          onClose={() => {
            setModalFilterAdd(false);
            // setFilterOrCategoryNameInpValueForAdding("");
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <div className="modal_add_filter_block px-4 py-4">
            <div className="header_modal_add_filter flex items-center gap-6 justify-between">
              <h1 className="text-[26px] font-600">Add Filter</h1>
              <button
                className="close_modal_btn outline-none cursor-pointer p-2 bg-[#D9D9D9] rounded-full"
                onClick={() => {
                  setModalFilterAdd(false);
                  // setFilterOrCategoryNameInpValueForAdding("");
                }}
              >
                <MdOutlineClose size={27} />
              </button>
            </div>
            <form
              className="form flex flex-col gap-2"
              onSubmit={handleSubmitAddingFilter}
            >
              <div className="label_inp_filter flex flex-col gap-2">
                <label
                  htmlFor="filter_name"
                  className="cursor-pointer text-[15px] font-500"
                >
                  Filter Name
                </label>
                <TextField
                  id="filter_name"
                  label="Name of Filter"
                  variant="outlined"
                  value={filterOrCategoryNameInpValueForAdding}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFilterOrCategoryNameInpValueForAdding(
                      event.target.value,
                    );
                  }}
                  required
                />
              </div>
              <div className="btn_submit_block mt-2">
                <button
                  type="submit"
                  className="bg-[#20ACFF] p-2.5 rounded-[10px] text-white text-[18px] font-500 cursor-pointer w-full disabled:opacity-50"
                  disabled={loadingAddFiltersOrCategories}
                >
                  {loadingAddFiltersOrCategories ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </Dialog>

        {/* Modal Edit Filter */}
        <Dialog
          open={modalFilterEdit}
          onClose={() => {
            setModalFilterEdit(false);
            setSelectedFilterId(null);
            setFilterOrCategoryNameInpValueForEditing("");
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <div className="modal_edit_filter_block px-4 py-4">
            <div className="header_modal_edit_filter flex items-center gap-6 justify-between">
              <h1 className="text-[26px] font-600">Edit Filter</h1>
              <button
                className="close_modal_btn outline-none cursor-pointer p-2 bg-[#D9D9D9] rounded-full"
                onClick={() => {
                  setModalFilterEdit(false);
                  setSelectedFilterId(null);
                  setFilterOrCategoryNameInpValueForEditing("");
                }}
              >
                <MdOutlineClose size={27} />
              </button>
            </div>
            <form
              className="form flex flex-col gap-2"
              onSubmit={handleSubmitEditingFilter}
            >
              <div className="label_inp_filter flex flex-col gap-2">
                <label
                  htmlFor="edit_filter_name"
                  className="cursor-pointer text-[15px] font-500"
                >
                  Filter Name
                </label>
                <TextField
                  id="edit_filter_name"
                  label="Name of Filter"
                  variant="outlined"
                  value={filterOrCategoryNameInpValueForEditing}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFilterOrCategoryNameInpValueForEditing(
                      event.target.value,
                    );
                  }}
                  required
                />
              </div>
              <div className="btn_edit_block mt-2">
                <button
                  type="submit"
                  className="bg-[#20ACFF] p-2.5 rounded-[10px] text-white text-[18px] font-500 cursor-pointer w-full disabled:opacity-50"
                  disabled={loadingEditFiltersOrCategories}
                >
                  {loadingEditFiltersOrCategories ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </form>
          </div>
        </Dialog>

        {/* Modal Delete Filter */}
        <Dialog
          open={modalFilterDelete}
          onClose={() => {
            setModalFilterDelete(false);
            setSelectedFilterId(null);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <div className="modal_delete_filter_block px-4 py-4">
            <div className="header_delete_filter_block flex items-center gap-6 justify-between">
              <h1 className="text-[19px] font-600">Delete Filter</h1>
              <button
                className="close_modal_btn outline-none cursor-pointer p-2 bg-[#D9D9D9] rounded-full"
                onClick={() => {
                  setModalFilterDelete(false);
                  setSelectedFilterId(null);
                }}
              >
                <MdOutlineClose size={27} />
              </button>
            </div>
            <DialogTitle sx={{ fontSize: 17 }}>
              Are you sure you want to delete this filter? This action cannot be
              undone.
            </DialogTitle>
            <div className="block_btns flex gap-2 justify-between sm:flex-col-reverse md:flex-row">
              <button
                className="bg-[#20ACFF] p-2.5 rounded-[10px] text-white text-[18px] font-500 cursor-pointer w-full duration-300 disabled:opacity-50"
                onClick={() => {
                  setModalFilterDelete(false);
                  setSelectedFilterId(null);
                }}
                disabled={loadingDeleteFilter}
              >
                No
              </button>
              <button
                className="bg-[red] p-2.5 rounded-[10px] text-white text-[18px] font-500 cursor-pointer w-full duration-300 disabled:opacity-50"
                onClick={deleteFilterOrCategory}
                disabled={loadingDeleteFilter}
              >
                {loadingDeleteFilter ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Yes"
                )}
              </button>
            </div>
          </div>
        </Dialog>
      </div>

      {/* Loading Backdrop for Books */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingBooks}
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

export default Books;
