import { HiOutlineSearch } from "react-icons/hi";
import userImg from "../../assets/user-img.svg";

// Icons
import TuneIcon from "@mui/icons-material/Tune";
import { LuPlus } from "react-icons/lu";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useMemo, useState } from "react";

//Material UI
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

const Books = () => {
  const [limitPerPage, setLimitPerPage] = useState<number>(17);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("bookTitle");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  // const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Table
  interface Data {
    id: number;
    img: string;
    bookTitle: string;
    author: string;
    category: string;
    bookPage: number;
    status: string;
  }

  function createData(
    id: number,
    img: string,
    bookTitle: string,
    author: string,
    category: string,
    bookPage: number,
    status: string,
  ): Data {
    return {
      id,
      img,
      bookTitle,
      author,
      category,
      bookPage,
      status,
    };
  }

  const rows = [
    createData(
      1,
      "/src/assets/signIn/logo-pehraft-sign-in.svg",
      "Cashflow Quadrant",
      "Robert Kiyosaki",
      "Finance",
      256,
      "Available",
    ),
  ];

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
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

  interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
  }

  const headCells: readonly HeadCell[] = [
    {
      id: "img",
      numeric: false,
      disablePadding: true,
      label: "Image",
    },
    {
      id: "bookTitle",
      numeric: false,
      disablePadding: true,
      label: "Book Title",
    },
    {
      id: "author",
      numeric: false,
      disablePadding: false,
      label: "Author",
    },
    {
      id: "category",
      numeric: false,
      disablePadding: false,
      label: "Category",
    },
    {
      id: "bookPage",
      numeric: true,
      disablePadding: false,
      label: "Book Page",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },
  ];

  interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (
      event: React.MouseEvent<unknown>,
      property: keyof Data,
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

  function EnhancedTableHead(props: EnhancedTableProps) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler =
      (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              // align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
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
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  interface EnhancedTableToolbarProps {
    numSelected: number;
  }

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
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Nutrition
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
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

  // const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDense(event.target.checked);
  // };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <div className="books_component p-4">
      <div className="header_books flex justify-between items-center gap-6">
        <div className="search_logo_and_search_input relative flex items-center flex-1 gap-4">
          <HiOutlineSearch size={24} className="absolute top-4 left-4" />
          <input
            type="search"
            className="inp_search outline-none shadow-[0_0_6px_gray] pl-12 pr-4 py-3 rounded-[30px] text-[20px] font-500 sm:w-full md:w-[90%] lg:w-[80%]"
            placeholder="Search enter..."
          />
          <button className="icons_filter_block shadow-[0_0_6px_gray] flex justify-center items-center p-2 rounded-[10px]">
            <TuneIcon
              sx={{
                fontSize: "36px",
              }}
            />
          </button>
        </div>
        <div className="fullname_img_of_admin_and_admin_title sm:hidden md:flex items-center gap-3">
          <div className="fullname_of_user_and_admin_title">
            <h1 className="text-[22px] font-500">Suhrob H.</h1>
            <h1 className="text-[#808080] text-[15px] font-400 text-right">
              Admin
            </h1>
          </div>
          <img className="w-14 h-14" src={userImg} alt="" />
        </div>
      </div>
      <div className="section_books mt-7">
        <div className="title_filter_btn_add__book_block flex justify-between items-center gap-2">
          <h1 className="title_filter sm:text-[18px] md:text-2xl font-600">
            Manage Books
          </h1>
          <div className="filter_and_btn_add_block flex justify-between items-center gap-6">
            <div className="filter_block md:flex items-center gap-4 sm:hidden">
              <h3 className="filter_title text-[20px] font-600">Showing</h3>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Limit</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={limitPerPage}
                  label="Limit"
                  onChange={(event: any) => {
                    setLimitPerPage(event.target.value);
                  }}
                >
                  <MenuItem value={17}>17</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>{" "}
            </div>
            <button className="flex items-center gap-2 bg-[#20ACFF] p-2.5 rounded-[10px] text-white text-[18px] font-500 cursor-pointer">
              <LuPlus />
              Add new book
            </button>
          </div>
        </div>
        <div className="filter_mobile_size sm:flex flex-col gap-1 md:hidden mt-3">
          <h3 className="filter_title text-[20px] font-600">Showing</h3>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Limit</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={limitPerPage}
              label="Limit"
              onChange={(event: any) => {
                setLimitPerPage(event.target.value);
              }}
            >
              <MenuItem value={17}>17</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>{" "}
        </div>

        <div className="table_books mt-6">
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                // size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const isItemSelected = selected.includes(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <img
                            src={row.img}
                            className="w-10 h-10 rounded-full"
                            alt="Book cover"
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.bookTitle}
                        </TableCell>
                        <TableCell>{row.author}</TableCell>
                        <TableCell>{row.category}</TableCell>
                        <TableCell>{row.bookPage}</TableCell>
                        <TableCell>{row.status}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        // height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Books;
