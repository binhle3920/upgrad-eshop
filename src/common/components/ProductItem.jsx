import { IconButton, Paper, Stack , Typography } from "@mui/material";
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
      height: 550
    }}>
      <Stack height="90%" justifyContent="space-between" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px' }}>
        <Stack>
          <img
            src={imageUrl || "https://www.rallis.com/Upload/Images/thumbnail/Product-inside.png"}
            alt={name}
            width="100%"
            height={300}
            style={{ objectFit: "cover", borderRadius: '4px' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between' ,  margin: '8px 0' }}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="h6">₹ {price}</Typography>
          </div>

          <Typography variant="body1" sx={{color:'grey'}}>{description}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <CommonButton
            label="Buy"
            sx={{
              width: 'fit-content',
            }}
            onClick={() => {
              navigate(`${ROUTES.PRODUCTS}/${id}`);
            }}
          />

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
