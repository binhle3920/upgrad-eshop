import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Stack, Step, StepLabel, Stepper, } from "@mui/material";
import CommonButton from "../../common/components/Button";
import { ROUTES } from "../../utils/constants";
import { useSnackbar } from "../../context/snackbar/snackbar-context";
import AddAddressStep from "./AddAddressStep";
import PlaceOrderStep from "./PlaceOrderStep";
import { getProduct } from "../../api/product";
import { addOrder } from "../../api/order";

const STEP_LABELS = ['Items', 'Select Address', 'Place order'];

const ActionStep = ({isLastStep, onNextStep, onPrevStep}) => {
  return (
    <Stack direction="row" spacing="10">
      <Button onClick={onPrevStep} variant="text" sx={{color: "gray", mr: "20px !important"}}>
        Back
      </Button>
      <CommonButton onClick={onNextStep} label={isLastStep ? 'Place order' : 'Next'}/>
    </Stack>
  )
}

const OrderScreen = () => {
  const [product, setProduct] = useState(null);
  const [address, setAddress] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({
    0: true
  })

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {showNotification} = useSnackbar();

  const productId = searchParams.get('productId');
  const quantity = parseInt(searchParams.get('quantity'));

  useEffect(() => {
    if (!productId || !quantity) {
      navigate(ROUTES.HOME);
    } else {
      getProduct(productId).then(async (response) => {
        if (response.status !== 200) {
          showNotification({
            message: 'Cannot fetch product details!',
            severity: 'error'
          })
          navigate(ROUTES.HOME);
        }

        setProduct(await response.json());
      }).catch((error) => {
        showNotification({
          message: 'Cannot fetch product details!',
          severity: 'error'
        })
        navigate(ROUTES.HOME);
      });
    }
  }, [navigate, productId, quantity, showNotification]);

  const handleNextStep = () => {
    if (activeStep === 2) {
      addOrder({quantity, productId: product.id, addressId: address.id}).then(async (response) => {
        if (response.status === 201) {
          showNotification({
            message: 'Order placed successfully!',
            severity: 'success'
          })
          navigate(ROUTES.HOME);
        } else {
          showNotification({
            message: 'Cannot place order!',
            severity: 'error'
          })
        }
      }).catch((error) => {
        showNotification({
          message: 'Cannot place order!',
          severity: 'error'
        })
      })
    } else {
      if (activeStep === 1 && !address) {
        showNotification({
          message: 'Please select address!',
          severity: 'error'
        })
        return;
      }

      setActiveStep(activeStep + 1);
      setCompletedSteps({
        ...completedSteps,
        [activeStep]: true
      })
    }
  }

  const handlePrevStep = () => {
    if (activeStep === 1) {
      navigate(`${ROUTES.PRODUCTS}/${product.id}`)
    } else {
      setActiveStep(activeStep - 1);
      setCompletedSteps({
        ...completedSteps,
        [activeStep - 1]: false
      })
    }
  }

  return (
    <Stack justifyContent="center" py={5} alignItems="center" width="100%" spacing={5}>
      <Stepper activeStep={activeStep} sx={{width: "90%"}} d>
        {STEP_LABELS.map((label, index) => (
          <Step key={label} completed={completedSteps[index]}>
            <StepLabel color="inherit" sx={{
              '.Mui-active': {
                color: '#3f51b5'
              },
              '.Mui-completed': {
                color: '#3f51b5'
              }
            }}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 1 && (
        <AddAddressStep onChangeAddress={(address) => setAddress(address)}/>
      )}

      {activeStep === 2 && (
        <PlaceOrderStep address={address} product={product}/>
      )}

      <ActionStep
        isLastStep={activeStep === STEP_LABELS.length - 1}
        onNextStep={handleNextStep}
        onPrevStep={handlePrevStep}
      />
    </Stack>
  )
}

export default OrderScreen;
