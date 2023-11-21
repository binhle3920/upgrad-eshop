import { Divider, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AddAddress from "../../common/components/AddAddress";
import { useEffect, useState } from "react";
import { getAddresses } from "../../api/address";

const AddAddressStep = ({ onChangeAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState('');

  useEffect(() => {
    onChangeAddress(null);
    getAddresses().then(async (response) => {
      setAddresses(await response.json());
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddAddress = (address) => {
    setAddresses([
      ...addresses,
      address
    ])
  }

  const handleChangedAddress = (e) => {
    setSelectedIndex(e.target.value);
    onChangeAddress(addresses[e.target.value]);
  }

  return (
    <>
      <FormControl sx={{ width: "70%" }} size="medium">
        <InputLabel id="address-label">Select Address</InputLabel>
        <Select
          labelId="address-label"
          id="address"
          value={selectedIndex}
          label="Select Address"
          onChange={handleChangedAddress}
        >
          {addresses.map((item, index) => (
            <MenuItem key={item.id} value={index}>
              {`${item.name} --> ${item.street}, ${item.city}, ${item.state}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider sx={{ width: 100, color: "gray" }}>OR</Divider>

      <AddAddress onAddAddress={handleAddAddress} />
    </>
  )
}

export default AddAddressStep;
