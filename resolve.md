# user
- createAccount(CreateAccountInput): CreateAccountOutput 
- login(LoginInput): LoginOutput
- me(User): User
- userProfile( UserProfileInput ): UserProfileOutput
- editProfile( User, EditProfileInput): EditProfileOutput
- verifyEmail(VerifyEmailInput): VerifyEmailOutput

### UserRole
'Client', 'Owner', 'Delivery', 'Any'


# Restaurant
- createRestaurant(User, CreateRestaurantInput): CreateRestaurantOutput  
- myRestaurants(User): MyRestaurantsOutput  
- myRestaurant(User, MyRestaurantInput): MyRestaurantOutput  
- editRestaurant(User, EditRestaurantInput): EditRestaurantOutput
- deleteRestaurant(User, DeleteRestaurantInput
  ): DeleteRestaurantOutput
- restaurants( RestaurantsInput ): RestaurantsOutput
- restaurant(RestaurantInput): RestaurantOutput  
- searchRestaurant(SearchRestaurantInput): SearchRestaurantOutput

> ___custom repository___
src/restaurants/repositories/category.repository.ts

# Category  
- restaurantCount(Category): number
- allCategories(): AllCategoriesOutput
- category(CategoryInput): CategoryOutput

# Dish
- createDish(User, CreateDishInput): CreateDishOutput
- editDish(User, EditDishInput): EditDishOutput
- deleteDish(User, DeleteDishInput): DeleteDishOutput

## DishChoice


## DishOption

# Payment
- createPayment(User, CreatePaymentInput): CreatePaymentOuput
- getPayments(User): GetPaymentsOutput

# Order
- createOrder(User, CreateOrderInput): CreateOrderOutput  
- getOrders(User, GetOrdersInput): GetOrdersOutput
- getOrder(User,GetOrderInput): GetOrderOutput
- editOrder(User, EditOrderInput): EditOrderOutput
- pendingOrders() // Subscription  
- cookedOrders() // Subscription  
- orderUpdates(OrderUpdatesInput) // Subscription  
- takeOrder(User, TakeOrderInput): TakeOrderOutput

# Auth
> decorator
> guard

# jwt
> middleware
> dynamic module

# mail module