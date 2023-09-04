# common  
id: number;  
createdAt: Date;  
updatedAt: Date;  

# user
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

# Verification
code: string;
user: User; //relation

# Restaurant
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

# Category  
name: string;  
coverImg: string;  
slug: string; // 컬럼 유니크  
restaurants: Restaurant[]; //relation  

# Dish
name: string;  
price: number;  
photo: string;  
description: string;  
restaurant: Restaurant; //relation  
restaurantId: number; //relation  
options?: DishOption[]; //relation  

## DishChoice
name: string;  
extra?: number;  

## DishOption
name: string;  
choices?: DishChoice[];  
extra: number;  

# Payment
transactionId: string;  
user: User; 
userId: number; 
restaurant: Restaurant;  
restaurantId: number;  

# Order
| ManyToMany 관계는 시작하는 엔티티에서 @JoinTable() 셋팅해줘야 함.  

customer?: User;  
customerId: number;  
driver?: User;  
driverId: number;  
restaurant?: Restaurant;  
items: OrderItem[];  
total: number;  
status: OrderStatus;  

## OrderItemOption  
name: string;  
choice: String;  

## OrderItem  
dish: Dish;  
options?: OrderItemOption[];  