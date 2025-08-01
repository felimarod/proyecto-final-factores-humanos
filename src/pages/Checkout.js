import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { CreditCard, LocalShipping, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const steps = ['Información de Envío', 'Método de Pago', 'Confirmación'];

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [orderComplete, setOrderComplete] = useState(false);
  
  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Process order
      handleCompleteOrder();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCompleteOrder = () => {
    // Simulate order processing
    setOrderComplete(true);
    clearCart();
  };

  const handleCloseDialog = () => {
    setOrderComplete(false);
    navigate('/');
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return Object.values(shippingInfo).every(value => value.trim() !== '');
      case 1:
        return paymentMethod === 'cash' || 
               Object.values(paymentInfo).every(value => value.trim() !== '');
      case 2:
        return true;
      default:
        return false;
    }
  };

  if (cart.items.length === 0 && !orderComplete) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">
          Tu carrito está vacío. No puedes proceder al checkout.
          <Button onClick={() => navigate('/')} sx={{ ml: 2 }}>
            Ir a comprar
          </Button>
        </Alert>
      </Container>
    );
  }

  const renderShippingForm = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Nombre"
          value={shippingInfo.firstName}
          onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Apellido"
          value={shippingInfo.lastName}
          onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Email"
          type="email"
          value={shippingInfo.email}
          onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Teléfono"
          value={shippingInfo.phone}
          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Dirección"
          value={shippingInfo.address}
          onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          required
          fullWidth
          label="Ciudad"
          value={shippingInfo.city}
          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth required>
          <InputLabel>Departamento</InputLabel>
          <Select
            value={shippingInfo.state}
            label="Departamento"
            onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
          >
            <MenuItem value="cundinamarca">Cundinamarca</MenuItem>
            <MenuItem value="antioquia">Antioquia</MenuItem>
            <MenuItem value="valle">Valle del Cauca</MenuItem>
            <MenuItem value="atlantico">Atlántico</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          required
          fullWidth
          label="Código Postal"
          value={shippingInfo.zipCode}
          onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
        />
      </Grid>
    </Grid>
  );

  const renderPaymentForm = () => (
    <Box>
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <FormLabel component="legend">Método de Pago</FormLabel>
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel 
            value="credit" 
            control={<Radio />} 
            label="Tarjeta de Crédito/Débito" 
          />
          <FormControlLabel 
            value="cash" 
            control={<Radio />} 
            label="Pago Contraentrega" 
          />
        </RadioGroup>
      </FormControl>

      {paymentMethod === 'credit' && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Número de Tarjeta"
              placeholder="1234 5678 9012 3456"
              value={paymentInfo.cardNumber}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Fecha de Vencimiento"
              placeholder="MM/YY"
              value={paymentInfo.expiryDate}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="CVV"
              placeholder="123"
              value={paymentInfo.cvv}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Nombre en la Tarjeta"
              value={paymentInfo.cardName}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
            />
          </Grid>
        </Grid>
      )}

      {paymentMethod === 'cash' && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Pagarás en efectivo al momento de la entrega. El repartidor llevará cambio si es necesario.
        </Alert>
      )}
    </Box>
  );

  const renderConfirmation = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Typography variant="h6" gutterBottom>
          Información de Envío
        </Typography>
        <Typography variant="body1">
          {shippingInfo.firstName} {shippingInfo.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {shippingInfo.email} | {shippingInfo.phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Método de Pago
        </Typography>
        <Typography variant="body1">
          {paymentMethod === 'credit' ? 'Tarjeta de Crédito/Débito' : 'Pago Contraentrega'}
        </Typography>
        {paymentMethod === 'credit' && (
          <Typography variant="body2" color="text.secondary">
            **** **** **** {paymentInfo.cardNumber.slice(-4)}
          </Typography>
        )}

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Productos
        </Typography>
        {cart.items.map((item) => (
          <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">
              {item.name} x{item.quantity}
            </Typography>
            <Typography variant="body2">
              {formatPrice(item.price * item.quantity)}
            </Typography>
          </Box>
        ))}
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Resumen del Pedido
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Subtotal:</Typography>
              <Typography variant="body1">{formatPrice(getTotalPrice())}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Envío:</Typography>
              <Typography variant="body1">Gratis</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="primary">
                {formatPrice(getTotalPrice())}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return renderShippingForm();
      case 1:
        return renderPaymentForm();
      case 2:
        return renderConfirmation();
      default:
        return 'Paso desconocido';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={() => {
                const icons = [<LocalShipping />, <CreditCard />, <CheckCircle />];
                return icons[index];
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card>
        <CardContent>
          {getStepContent()}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Atrás
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!isStepValid()}
            >
              {activeStep === steps.length - 1 ? 'Confirmar Pedido' : 'Siguiente'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Order Completion Dialog */}
      <Dialog open={orderComplete} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center' }}>
          <CheckCircle color="success" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h5">¡Pedido Confirmado!</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" align="center">
            Tu pedido ha sido procesado exitosamente. Recibirás un email de confirmación 
            con los detalles de tu compra y el seguimiento del envío.
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Número de pedido: #PED-{Date.now()}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button variant="contained" onClick={handleCloseDialog}>
            Continuar Comprando
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Checkout;
