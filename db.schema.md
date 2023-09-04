# DB Schema
[DB Schema](#db-schema) | [Resolver](#resolver)

[common](#common) | [user](#user) | [UserRole](#userrole) | [Verification](#verification) | [Restaurant](#restaurant) | [Category](#category) | [Dish](#dish) | [DishChoice](#dishchoice) | [DishOption](#dishoption) | [Payment](#payment) | [Order](#order) | [OrderItemOption](#orderitemoption) | [OrderItem](#orderitem)  
## common  
id: number;  
createdAt: Date;  
updatedAt: Date;  

## user
email: string;  
password: string;  
role: UserRole;  
verified: boolean;  
restaurants: Restaurant[]; //relation  
orders: Order[];  
payments: Payment[]; //relation  
riders: Order[]; //relation

### UserRole
'Client', 'Owner', 'Delivery', 'Any'

## Verification
code: string;
user: User; //relation

## Restaurant
name: string;  
coverImg: string;  
address: string;  
category: Category; //relation  
owner: User; //relation  
ownerId: number; //relation  
menu: Dish[]; //relation  
orders: Order[]; //relation  
isPromoted: boolean;  
promotedUntil: Date;  

## Category  
name: string;  
coverImg: string;  
slug: string; // 컬럼 유니크  
restaurants: Restaurant[]; //relation  

## Dish
name: string;  
price: number;  
photo: string;  
description: string;  
restaurant: Restaurant; //relation  
restaurantId: number; //relation  
options?: DishOption[]; //relation  

### DishChoice
name: string;  
extra?: number;  

### DishOption
name: string;  
choices?: DishChoice[];  
extra: number;  

## Payment
transactionId: string;  
user: User; 
userId: number; 
restaurant: Restaurant;  
restaurantId: number;  

## Order
| ManyToMany 관계는 시작하는 엔티티에서 @JoinTable() 셋팅해줘야 함.  

customer?: User;  
customerId: number;  
driver?: User;  
driverId: number;  
restaurant?: Restaurant;  
items: OrderItem[];  
total: number;  
status: OrderStatus;  

### OrderItemOption  
name: string;  
choice: String;  

### OrderItem  
dish: Dish;  
options?: OrderItemOption[];  
  
# Resolver
[DB Schema](#db-schema) | [Resolver](#resolver)
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