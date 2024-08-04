import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay'; // Import Razorpay
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icons from React Native Vector Icons

// Sample product data
const products = [
  { id: '1', name: 'Eco-Friendly Water Bottle', price: 15.99 },
  { id: '2', name: 'Reusable Shopping Bags (Set of 5)', price: 25.00 },
  { id: '3', name: 'Solar-Powered Charger', price: 49.99 },
];

const Buy = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const incrementQuantity = (product) => {
    setCart(prevCart => {
      return prevCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    });
  };

  const decrementQuantity = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct && existingProduct.quantity > 1) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart;
    });
  };

  const handleCheckout = () => {
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const options = {
      description: 'Purchase of green products',
      currency: 'INR',
      key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay key ID
      amount: totalAmount * 100, // Amount in paise (convert from INR)
      name: 'Green Fintech App',
      prefill: {
        email: 'aswath2111001@ssn.edu.in', // Replace with actual user email
        contact: '1234567890', // Replace with actual user contact number
      },
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        // Handle success
        Alert.alert('Success', `Payment successful! Payment ID: ${data.razorpay_payment_id}`);
        // Clear cart or redirect to a success screen
        setCart([]);
      })
      .catch((error) => {
        // Handle failure
        Alert.alert('Error', `Payment failed! ${error.description}`);
      });
  };

  const viewCart = () => {
    Alert.alert('Cart', cart.map(item => `${item.name} x ${item.quantity}`).join('\n'));
  };

  return (
    <View style={styles.container}>
      <Button title="View Cart" onPress={viewCart} disabled={cart.length === 0} color="#004d00" />
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <View style={styles.iconContainer}>
              <Icon name="shopping-cart" size={24} color="#4caf50" />
            </View>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            <Text style={styles.productName}>{item.name}</Text>
            <TouchableOpacity 
              style={styles.addToCartButton}
              onPress={() => addToCart(item, (cart.find(i => i.id === item.id)?.quantity || 0) + 1)}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                style={styles.adjustButton}
                onPress={() => decrementQuantity(item)}
              >
                <Text style={styles.adjustButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{cart.find(i => i.id === item.id)?.quantity || 0}</Text>
              <TouchableOpacity 
                style={styles.adjustButton}
                onPress={() => incrementQuantity(item)}
              >
                <Text style={styles.adjustButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Button title="Checkout" onPress={handleCheckout} disabled={cart.length === 0} color="#004d00" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#96d4a8',
  },
  productContainer: {
    backgroundColor: '#d1edd9',
    borderColor: 'black',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: 'black', // Black color for product price
    marginBottom: 4,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addToCartButton: {
    backgroundColor: '#2e8c49',
    borderRadius: 4,
    padding: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  adjustButton: {
    backgroundColor: '#4caf50',
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 4,
    borderColor: 'black',
    borderWidth: 1,
  },
  adjustButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  quantity: {
    fontSize: 18,
    width: 40,
    textAlign: 'center',
  },
});

export default Buy;
