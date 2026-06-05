import { HiOutlineSearch } from "react-icons/hi";

// Images
import userImg from "../../assets/user-img.svg";
import memberImg from "../../assets/profile-img.jpg";
import bookImg from "../../assets/tojikon.jpg";

// Table
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
import { BsThreeDots } from "react-icons/bs";
import { alpha } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { LuOctagonAlert } from "react-icons/lu";
import { axiosRequest } from "../../utils/axiosRequest";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Members = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<any>("name");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(17);

  const [modalInfoAboutMember, setModalInfoAboutMember] =
    useState<boolean>(false);

  const [members, setMembers] = useState<any[]>([]);
  const [loadingMembers, setLoadingMembers] = useState<boolean>(false);
  const [loadingMemberDetails, setLoadingMemberDetails] =
    useState<boolean>(false);
  const [memberInsideModal, setMembersInsideModal] = useState<any>(null);
  const [totalMembersCount, setTotalMembersCount] = useState<number>(0);
  const [searchInpValue, setSearchInpValue] = useState<string>("");

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
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Full Name",
      sortable: true,
    },
    {
      id: "date_of_birth",
      numeric: false,
      disablePadding: false,
      label: "Date of Birthday",
      sortable: true,
    },
    {
      id: "phone",
      numeric: false,
      disablePadding: false,
      label: "Phone Number",
      sortable: true,
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email Address",
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
      const newSelected = members.map((n: any) => n.id);
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
      [...members]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, members],
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - members.length) : 0;

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

  async function getMembers() {
    setLoadingMembers(true);
    try {
      const { data } = await axiosRequest.get(
        `${import.meta.env.VITE_API_URL}/admin/members?search=${searchInpValue}&page=${page + 1}&page_size=${rowsPerPage}`,
      );
      setMembers(data.members || data.data || []);
      setTotalMembersCount(data.total || data.members?.length || 0);
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to load members", "error");
    } finally {
      setLoadingMembers(false);
    }
  }

  async function getMemberDetails(memberId: number) {
    setLoadingMemberDetails(true);
    try {
      const { data } = await axiosRequest.get(
        `${import.meta.env.VITE_API_URL}/admin/members/${memberId}`,
      );
      setMembersInsideModal(data);
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to load member details", "error");
    } finally {
      setLoadingMemberDetails(false);
    }
  }

  useEffect(() => {
    getMembers();
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
          Members
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
      <div className="members_component">
        <div className="members_component_block p-4 max-w-360 mx-auto">
          <div className="header_member_component flex justify-between items-center gap-6">
            <div className="search_logo_and_search_input relative flex-1">
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
            </div>
            <div className="fullname_img_of_admin_and_admin_title sm:hidden md:flex items-center gap-3">
              <div className="fullname_of_user_and_admin_title">
                <h1 className="text-[22px] font-500">Suhrob H.</h1>
                <h1 className="text-[#808080] text-[15px] font-400 text-right">
                  Admin
                </h1>
              </div>
              <img className="w-14 h-14" src={userImg} alt="Admin avatar" />
            </div>
          </div>

          <div className="section_member_component mt-6">
            <Paper
              sx={{
                width: "100%",
                paddingLeft: 3,
                paddingRight: 3,
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
                    rowCount={members.length}
                  />
                  <TableBody>
                    {visibleRows.map((member: any, index: number) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={member.id}
                        >
                          <TableCell>
                            <img
                              src={member.image_url || memberImg}
                              className="w-10 h-10 rounded-full object-cover"
                              alt="Member avatar"
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {member.name}
                          </TableCell>
                          <TableCell>{member.date_of_birth}</TableCell>
                          <TableCell>{member.phone}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>
                            <BsThreeDots
                              size={27}
                              className="cursor-pointer text-blue-600 hover:text-blue-800 duration-100"
                              onClick={() => {
                                setModalInfoAboutMember(true);
                                getMemberDetails(member.id);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {loadingMembers === false && members.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <h1>No members found</h1>
                        </TableCell>
                      </TableRow>
                    )}
                    {loadingMembers && (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <CircularProgress size={40} />
                        </TableCell>
                      </TableRow>
                    )}
                    {emptyRows > 0 && !loadingMembers && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 8, 10, 17]}
                component="div"
                count={totalMembersCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>

            {/* Modal about member info */}
            <Dialog
              open={modalInfoAboutMember}
              onClose={() => {
                setModalInfoAboutMember(false);
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="md"
              fullWidth
            >
              <div className={`modal_info_about_member_block `}>
                {loadingMemberDetails ? (
                  <div className="flex justify-center items-center p-10">
                    <CircularProgress />
                  </div>
                ) : (
                  memberInsideModal && (
                    <div className="modal_info_about_member_sub_block sm:p-4 md:p-2.5 flex items-center gap-5 min-w-0 flex-wrap">
                      <div className="info_about_member shrink-0 flex flex-col sm:justify-center md:justify-start sm:w-full md:w-[45%]">
                        <div className="btn_close_block">
                          <IoArrowBackCircleOutline
                            size={25}
                            className="cursor-pointer"
                            onClick={() => {
                              setModalInfoAboutMember(false);
                            }}
                          />
                        </div>
                        <div className="info_about_member flex flex-col sm:justify-center md:justify-start sm:items-center md:items-start">
                          <img
                            src={memberInsideModal.image_url || memberImg}
                            className="w-58.5 h-68.5 rounded-xl object-contain"
                            alt="Member avatar"
                          />
                          <div className="info_text_block mt-4">
                            <h1 className="info_text_title text-[22px] font-500">
                              Bio Info
                            </h1>
                            <h1 className="text-[#6E6E6E] text-[17px] font-500 mt-2">
                              Full Name:{" "}
                              <span className="text-black font-400">
                                {memberInsideModal.name}
                              </span>
                            </h1>
                            <h1 className="text-[#6E6E6E] text-[17px] font-500 mt-1">
                              Birth Date:{" "}
                              <span className="text-black font-400">
                                {memberInsideModal.date_of_birth}
                              </span>
                            </h1>
                            <h1 className="text-[#6E6E6E] text-[17px] font-500 mt-1">
                              Phone:{" "}
                              <span className="text-black font-400">
                                {memberInsideModal.phone}
                              </span>
                            </h1>
                            <h1 className="text-[#6E6E6E] text-[17px] font-500 mt-1">
                              Email:{" "}
                              <span className="text-black font-400">
                                {memberInsideModal.email}
                              </span>
                            </h1>
                            <h1 className="text-[#6E6E6E] text-[17px] font-500 mt-1">
                              Membership Date:{" "}
                              <span className="text-black font-400">
                                {memberInsideModal.created_at
                                  ? new Date(
                                      memberInsideModal.created_at,
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </span>
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="info_bookshelf_and_history_book_block flex flex-col gap-3 flex-1 min-w-0">
                        <div className="info_about_bookshelf_of_member">
                          <h1 className="bookshelf_title text-[25px] font-500 border-b-3 pb-2">
                            Bookshelf
                          </h1>
                          <div className="bookshelf_block p-3 h-47 overflow-auto flex flex-col gap-3 border-b-2 border-b-[#D9D9D9] w-full">
                            {memberInsideModal.current_borrowings &&
                            memberInsideModal.current_borrowings.length > 0 ? (
                              memberInsideModal.current_borrowings.map(
                                (borrowing: any, idx: number) => (
                                  <div
                                    key={idx}
                                    className="boolshelf_container flex justify-between items-center gap-3 sm:w-80 md:w-auto"
                                  >
                                    <div className="img_book_name_and_author_name_block flex items-center gap-3">
                                      <div className="block_img bg-[#F5EABD] p-2 rounded-[5px]">
                                        <img
                                          src={
                                            borrowing.book?.image_url || bookImg
                                          }
                                          alt=""
                                          className="w-10.75 h-15 object-cover"
                                        />
                                      </div>
                                      <div className="name_and_author_of_book">
                                        <h1 className="name_of_book text-[20px] font-500">
                                          {borrowing.book?.title ||
                                            "Unknown Book"}
                                        </h1>
                                        <p className="author_of_book text-[#515151] text-[14px] font-400">
                                          {borrowing.book?.author ||
                                            "Unknown Author"}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="icon_and_days_left">
                                      <h1 className="flex items-center text-[#FF383C] gap-1.5">
                                        <LuOctagonAlert size={18} />
                                        <span className="text-[12px] font-600">
                                          {borrowing.days_left || "Overdue"}{" "}
                                          days left
                                        </span>
                                      </h1>
                                    </div>
                                  </div>
                                ),
                              )
                            ) : (
                              <div className="text-center text-gray-500 py-4">
                                No books currently borrowed
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="info_about_history_book_of_member">
                          <h1 className="history_book_title text-[25px] font-500 border-b-3 pb-2">
                            History Book
                          </h1>
                          <div className="history_book_block p-3 h-47 overflow-auto flex flex-col gap-3 border-b-2 border-b-[#D9D9D9]">
                            {memberInsideModal.borrowing_history &&
                            memberInsideModal.borrowing_history.length > 0 ? (
                              memberInsideModal.borrowing_history.map(
                                (history: any, idx: number) => (
                                  <div
                                    key={idx}
                                    className="hisory_book_container flex items-center gap-3 sm:w-50 md:w-auto"
                                  >
                                    <div className="block_img bg-[#F5EABD] p-2 rounded-[5px]">
                                      <img
                                        src={history.book?.image_url || bookImg}
                                        alt=""
                                        className="w-10.75 h-15 object-cover"
                                      />
                                    </div>
                                    <div className="name_and_author_of_book">
                                      <h1 className="name_of_book text-[20px] font-500">
                                        {history.book?.title || "Unknown Book"}
                                      </h1>
                                      <p className="author_of_book text-[#515151] text-[14px] font-400">
                                        {history.book?.author ||
                                          "Unknown Author"}
                                      </p>
                                      <p className="returned_date text-[#6E6E6E] text-[12px]">
                                        Returned:{" "}
                                        {history.returned_at
                                          ? new Date(
                                              history.returned_at,
                                            ).toLocaleDateString()
                                          : "Not returned"}
                                      </p>
                                    </div>
                                  </div>
                                ),
                              )
                            ) : (
                              <div className="text-center text-gray-500 py-4">
                                No borrowing history
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingMembers}
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

export default Members;
