import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay'; // Import Razorpay

// Sample product data
const products = [
  { id: '1', name: 'Eco-Friendly Water Bottle', price: 15.99 },
  { id: '2', name: 'Reusable Shopping Bags (Set of 5)', price: 25.00 },
  { id: '3', name: 'Solar-Powered Charger', price: 49.99 },
];

const Buy = () => {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState({});

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
    setQuantity(prevQuantity => ({
      ...prevQuantity,
      [product.id]: (prevQuantity[product.id] || 0) + 1,
    }));
  };

  const decrementQuantity = (product) => {
    setQuantity(prevQuantity => {
      const currentQuantity = prevQuantity[product.id] || 0;
      if (currentQuantity > 1) {
        return {
          ...prevQuantity,
          [product.id]: currentQuantity - 1,
        };
      }
      const { [product.id]: _, ...rest } = prevQuantity;
      return rest;
    });
  };

  const handleCheckout = () => {
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log(totalAmount);

    const options = {
      description: 'Purchase of green products',
      currency: 'INR',
      key: 'rzp_test_oykxxXHC4cpQ84', // Replace with your Razorpay key ID
      amount: totalAmount * 100, // Amount in paise (convert from INR)
      name: 'Green Fintech App',
      prefill: {
        email: 'aswath2111001@ssn.edu.in', // Replace with actual user email
        contact: '7010348134', // Replace with actual user contact number
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
        console.error('Payment failed:', error); // Log the error for debugging
        Alert.alert('Error', `Payment failed! ${error.description || error}`);
      });
  };

  const viewCart = () => {
    Alert.alert('Cart Contents', cart.map(item => `${item.name}: ${item.quantity} x ₹${item.price.toFixed(2)}`).join('\n'));
  };

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.productBox}>
            <Text style={styles.productTitle}>{item.name}</Text>
            <Text style={styles.productPrice}>₹{item.price.toFixed(2)}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => decrementQuantity(item)}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity[item.id] || 0}</Text>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => incrementQuantity(item)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <Button
              title="Add to Cart"
              onPress={() => addToCart(item, (quantity[item.id] || 0) + 1)}
              color="#031838"
            />
          </View>
        )}
      />
      <View style={styles.buttonsContainer}>
        <Button title="Checkout" onPress={handleCheckout} disabled={cart.length === 0} color="#031838" />
        <View style={styles.buttonSpacer} />
        <Button title="View Cart" onPress={viewCart} color="#031838" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#639cf2',
  },
  productBox: {
    backgroundColor: '#bdd2f2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: '#031838',
    borderWidth: 1,
    shadowColor: '#031838',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#031838',
  },
  productPrice: {
    fontSize: 18,
    color: '#031838',
    marginVertical: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityButton: {
    backgroundColor: '#031838',
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 4,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  quantity: {
    fontSize: 18,
    width: 40,
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: 20,
  },
  buttonSpacer: {
    height: 10, // Adjust the height to control the space between buttons
  },
});

export default Buy;
