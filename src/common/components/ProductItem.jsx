import { IconButton, Paper, Stack } from "@mui/material";
import CommonButton from "./Button";
import { useAuth } from "../../context/auth/auth-context";
import { ROUTES, USER_ROLES } from "../../utils/constants";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

const ProductItem = ({ id, imageUrl, name, description, price, onDelete }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.roles?.includes(USER_ROLES.ADMIN);

  const handleDelete = () => {
    onDelete(id)
  }

  const handleEdit = () => {
    navigate(`${ROUTES.ADMIN.EDIT_PRODUCT}/${id}`);
  }

  return (
    <Paper elevation={2} sx={{
      width: 400,
      height: 600,
    }}>
      <Stack direction="column" justifyContent="space-between" height="100%">
        <img
          src={imageUrl || "https://www.rallis.com/Upload/Images/thumbnail/Product-inside.png"}
          alt={name}
          width="100%"
          height={300}
          style={{
            objectFit: "cover",
          }}
        />

        <Stack direction="row" justifyContent="space-between" m={2}>
          <CommonButton label="Buy" sx={{
            width: 'fit-content',
          }} />

          {
            isAdmin && (
              <Stack direction="row" spacing={2}>
                <IconButton aria-label="edit" onClick={handleEdit}>
                  <EditIcon />
                </IconButton>

                <IconButton aria-label="delete" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
            )
          }
        </Stack>
      </Stack>
    </Paper>
  )
}

export default ProductItem;
