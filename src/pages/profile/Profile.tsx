import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

//Material UI
import {
  alpha,
  // styled,
  // useTheme
} from "@mui/material/styles";
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
import { visuallyHidden } from "@mui/utils";
import Dialog from "@mui/material/Dialog";
import { MdOutlineClose } from "react-icons/md";
import DialogTitle from "@mui/material/DialogTitle";

// Img
import noImg from "../../assets/no-img.jpg";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [imgBook, setImgBook] = useState<any>(null);

  // Handle Change of profile image
  const handleBookImageChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        console.log(event.target.result);
        setImgBook(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<any>("bookTitle");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(17);
  const [
    modalAcceptingOrDecliningUserAdminRequest,
    setModalAcceptingOrDecliningUserAdminRequest,
  ] = useState<boolean>(false);

  // Table Section
  const rows: any = [
    {
      id: 1,
      fullname: "Olim Yuldoshev",
      birthDate: "2003-19-11",
      phoneNumber: "919697875",
      email: "oyuldoshev39@hmail.com",
    },
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

  const headCells: any = [
    {
      id: "fullname",
      numeric: false,
      disablePadding: false,
      label: "Full Name",
    },
    {
      id: "age",
      numeric: false,
      disablePadding: false,
      label: "Age",
    },
    {
      id: "phone-number",
      numeric: false,
      disablePadding: false,
      label: "Phone number",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "email",
    },
    {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
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

  function EnhancedTableHead(props: EnhancedTableProps) {
    const {
      // onSelectAllClick,
      order,
      orderBy,
      // numSelected,
      // rowCount,
      onRequestSort,
    } = props;
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
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Requested Book Members
        </Typography>
      </Toolbar>
    );
  }

  const handleRequestSort = (_: React.MouseEvent<unknown>, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: any) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
  //   const selectedIndex = selected.indexOf(id);
  //   let newSelected: readonly number[] = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }
  //   setSelected(newSelected);
  // };

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
    <>
      <div className="profile_component">
        <div className="profile_component_block p-5 max-w-360 mx-auto">
          <div className="header_profile_component flex flex-col gap-2">
            <h1 className="text-[24px] font-600">Language</h1>
            <div className="header_profile_component_block shadow-[0_0_8px_#00000040] rounded-xl px-7 py-4">
              <div className="label_select_book_category flex flex-col gap-2">
                {/* <label
                htmlFor="language"
                className="cursor-pointer text-[15px] font-500"
                >
                Language
                </label> */}

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Language
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="language"
                    label="Language"
                  >
                    <MenuItem
                      value={""}
                      sx={{
                        color: "gray",
                      }}
                      disabled
                    >
                      Language
                    </MenuItem>
                    <MenuItem value={"en"}>English</MenuItem>
                    <MenuItem value={"ru"}>Russian</MenuItem>
                    <MenuItem value={"tj"}>Tajik</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="section_profile_component mt-6">
            <h1 className="text-[24px] font-600">Profile</h1>
            <form
              action=""
              className="edit_profile_form shadow-[0_0_8px_#00000040] rounded-xl px-7 py-4 mt-2 flex sm:flex-col lg:flex-row lg:justify-between lg:items-end gap-10"
            >
              <div className="block_img_profile_and_input_profile_component flex sm:flex-row lg:flex-col sm:justify-center lg:justify-start sm:flex-wrap md:flex-nowrap gap-12">
                <div className="block_edit_img flex flex-col gap-3">
                  {imgBook ? (
                    <img
                      className="w-38 h-38 shadow-2xl object-contain rounded-full"
                      src={imgBook}
                      alt=""
                    />
                  ) : (
                    <img
                      className="w-38 h-38 shadow-2xl object-cover rounded-full"
                      src={noImg}
                      alt=""
                    />
                  )}
                  <div className="label_and_input_user_profile_img flex flex-col gap-1">
                    <label
                      htmlFor="user_profile_img"
                      className="text-[15px] text-[gray] cursor-pointer"
                    >
                      User profile img
                    </label>
                    <input
                      type="file"
                      className="rounded-[5px] max-w-55 outline-none px-3 shadow-xl py-1 bg-white cursor-pointer"
                      name=""
                      id="user_profile_img"
                      onChange={handleBookImageChange}
                    />
                  </div>
                </div>
              </div>
              <div className="labels_and_inputs_edit_profile grid sm:grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form_edit_profile_block_1_fullname">
                  <label
                    htmlFor="fullname"
                    className="label_email text-[#9794AA] text-[16px] font-500 cursor-pointer"
                  >
                    Full Name
                  </label>
                  <TextField
                    id="fullname"
                    label="Enter your full name (first and last name)"
                    variant="outlined"
                    fullWidth
                    sx={{
                      marginTop: 1,
                    }}
                  />
                </div>
                <div className="form_edit_profile_block_2_date_of_birth">
                  <label
                    htmlFor="dateOfBirth"
                    className="label_email text-[#9794AA] text-[16px] font-500 cursor-pointer"
                  >
                    Date of Birth
                  </label>
                  <TextField
                    id="dateOfBirth"
                    label="Enter your date of birth"
                    variant="outlined"
                    fullWidth
                    // value={dateOfBirth}
                    // onChange={(e) => setDateOfBirth(e.target.value)}
                    // onBlur={() => handleBlur("dateOfBirth")}
                    // error={shouldShowError("dateOfBirth")}
                    // helperText={
                    //   shouldShowError("dateOfBirth") ? errors.dateOfBirth : ""
                    // }
                    sx={{
                      marginTop: 1,
                    }}
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className="form_edit_profile_block_3_phone_number">
                  <label
                    htmlFor="phoneNumber"
                    className="label_phone_number text-[#9794AA] text-[16px] font-500 cursor-pointer"
                  >
                    Phone Number
                  </label>
                  <TextField
                    id="phoneNumber"
                    label="Enter your phone number"
                    variant="outlined"
                    fullWidth
                    sx={{
                      marginTop: 1,
                    }}
                    type="tel"
                  />
                </div>
                <div className="form_edit_profile_block_4_email">
                  <label
                    htmlFor="email"
                    className="label_email text-[#9794AA] text-[16px] font-500 cursor-pointer"
                  >
                    Email
                  </label>
                  <TextField
                    id="email"
                    label="Enter your email"
                    variant="outlined"
                    fullWidth
                    sx={{
                      marginTop: 1,
                    }}
                    type="email"
                  />
                </div>
              </div>
              <div className="block_btn_submit">
                <button className="btn_submit bg-[#20ACFF] px-5 py-2 rounded-[15px] cursor-pointer text-[#FFFFFF] text-[19px] font-500 sm:w-full">
                  Edit
                </button>
              </div>
            </form>
            <div className="block_link_change_password mt-3">
              <h1 className="text-[24px] font-600">Edit Password</h1>
              <Link
                to={""}
                className="text-[blue]  hover:underline active:underline"
              >
                Change password
              </Link>
            </div>
          </div>
          <div className="footer_profile_component mt-6">
            <h1 className="text-[24px] font-600">Admins</h1>
            <Paper
              sx={{
                width: "100%",
                // mb: 2,
                paddingLeft: 3,
                paddingRight: 3,
              }}
            >
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
                      // const isItemSelected = selected.includes(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {/*  */}
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.fullname}
                          </TableCell>
                          <TableCell>{row.birthDate}</TableCell>
                          <TableCell>{row.phoneNumber}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>
                            <div className="btn_block">
                              <button
                                className="bg-[green] px-2.5 py-1.5 rounded-[5px] text-white text-[14px] font-500 cursor-pointer outline-none"
                                onClick={() => {
                                  setModalAcceptingOrDecliningUserAdminRequest(
                                    true,
                                  );
                                }}
                              >
                                Accept
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[17, 10, 8, 5]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>

            <Dialog
              open={modalAcceptingOrDecliningUserAdminRequest}
              onClose={() => {
                setModalAcceptingOrDecliningUserAdminRequest(false);
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              sx={{}}
              fullWidth
            >
              <div className="modal_delete_book_block px-4 py-4">
                <div className="header_delete_book_block flex items-center gap-6 justify-between">
                  <h1 className="text-[17px] font-600">
                    Request of becoming admin
                  </h1>
                  <button
                    className="close_modal_btn outline-none cursor-pointer p-2 bg-[#D9D9D9] rounded-full"
                    onClick={() => {
                      setModalAcceptingOrDecliningUserAdminRequest(false);
                    }}
                  >
                    <MdOutlineClose size={27} className="" />
                  </button>
                </div>
                <DialogTitle
                  sx={{
                    fontSize: 15,
                  }}
                >
                  {"Is this person really user of admin side of peshraft library?"}
                </DialogTitle>
                <div className="block_btns flex gap-2 justify-between sm:flex-col md:flex-row">
                  <button
                    className="bg-[#20ACFF] p-2.5 rounded-[10px] text-white text-[18px] font-500 cursor-pointer w-full duration-300"
                    onClick={() => {
                      setModalAcceptingOrDecliningUserAdminRequest(false);
                    }}
                  >
                    No
                  </button>
                  <button className="bg-[red]  p-2.5 rounded-[10px] text-white text-[18px] font-500 cursor-pointer w-full duration-300">
                    Yes
                  </button>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
