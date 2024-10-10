// This is a mock API file. In a real-world scenario, you would implement
// actual API calls to Chatwoot and WooCommerce here.

const getApiKeys = () => {
  return {
    wooCommerceKey: localStorage.getItem('wooCommerceKey') || '',
    wooCommerceSecret: localStorage.getItem('wooCommerceSecret') || '',
    chatwootToken: localStorage.getItem('chatwootToken') || '',
  };
};

export const fetchUserInfo = async () => {
  const { chatwootToken, wooCommerceKey, wooCommerceSecret } = getApiKeys();
  // In a real implementation, use these tokens to make API calls to Chatwoot and WooCommerce
  console.log('Using Chatwoot token:', chatwootToken);
  console.log('Using WooCommerce keys:', wooCommerceKey, wooCommerceSecret);

  // Simulating an API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate fetching user info from Chatwoot
      const userInfo = {
        client: {
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1 (555) 123-4567",
          notes: "Client prefers email communication. Interested in new product launches."
        },
        interestedProducts: [
          { id: 1, name: "Product A", image: "https://source.unsplash.com/random/100x100?product", price: 29.99 },
          { id: 2, name: "Product B", image: "https://source.unsplash.com/random/100x100?item", price: 39.99 },
        ],
        previousPurchases: [
          { id: 1001, date: "2023-03-15", total: 59.98, items: ["Product A", "Product C"] },
        ]
      };

      resolve(userInfo);
    }, 1000); // Simulate network delay
  });
};