import { useState } from "react";
import { PHONE_REGEX } from "../../utils/constants";
import { useSnackbar } from "../../context/snackbar/snackbar-context";
import { Stack, TextField, Typography } from "@mui/material";
import CommonButton from "./Button";
import { addAddress } from "../../api/address";

const AddAddress = ({ onAddAddress }) => {
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

  const { showNotification } = useSnackbar();

  const handleContactNumberChange = (e) => {
    const contactNumber = e.target.value;
    const isValid = PHONE_REGEX.test(contactNumber);

    if (contactNumber.length === 0) {
      setIsValidPhoneNumber(true);
      return;
    }

    setIsValidPhoneNumber(isValid);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const address = {
      name: e.target.name.value,
      contactNumber: e.target.contactNumber.value,
      street: e.target.street.value,
      city: e.target.city.value,
      state: e.target.state.value,
      landmark: e.target.landmark.value,
      zipcode: e.target.zipcode.value
    }

    const response = await addAddress(address);
    if (response.status === 201) {
      e.target.reset();
      onAddAddress(address);
      showNotification({
        message: 'Address added successfully',
        severity: 'success'
      })
    } else {
      showNotification({
        message: 'Error adding address',
        severity: 'error'
      })
    }
  }

  return (
    <Stack justifyContent="center" alignItems="center">
      <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" width={400}>
        <Typography variant="h4" pb={2}>
          Add Address
        </Typography>

        <form onSubmit={handleSubmit} style={{
          width: '100%',
        }}>
          <Stack direction="column" spacing={2} width="100%">
            <TextField id="name" label="Name" variant="outlined" type="text" required maxLength={255} />
            <TextField
              id="contactNumber"
              label="Contact Number"
              variant="outlined"
              type="string"
              required
              maxLength={255}
              error={!isValidPhoneNumber}
              helperText={!isValidPhoneNumber && "Invalid phone number"}
              onChange={handleContactNumberChange}
            />

            <TextField id="street" label="Street" variant="outlined" type="text" required maxLength={255} />
            <TextField id="city" label="City" variant="outlined" type="text" required maxLength={255} />
            <TextField id="state" label="State" variant="outlined" type="text" required maxLength={255} />
            <TextField id="landmark" label="Landmark" variant="outlined" type="text" maxLength={255} />
            <TextField id="zipcode" label="Zipcode" variant="outlined" type="text" required maxLength={255}/>

            <Stack pt={2}>
              <CommonButton label="Save Address" type="submit" />
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Stack>
  )
}

export default AddAddress;
