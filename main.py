from typing import Union
import uvicorn
from fastapi import FastAPI

from testclass import System, Category, Accessory, ReservationAccessory, Order, Cart, Payment, Account, Customer

app = FastAPI()

# ------------------------------------------------
#ADD_ACCESSORY
Website = System()

category_camera = Category("Camera")
category_len = Category("Lens")
category_battery = Category("Battery")
category_tripod = Category("Tripod")

Website.add_category(category_camera)
Website.add_category(category_len)
Website.add_category(category_battery)
Website.add_category(category_tripod)

accessory1 = Accessory(id="001", name="EOS R10 (Body)", brand="Canon", cost=500, lenter="Tham")
accessory2 = Accessory(id="002", name="EOS M50", brand="Canon", cost=400, lenter="Team")
accessory3 = Accessory(id="003", name="X-T20", brand="Fujifilm", cost=350, lenter="Photo")
accessory4 = Accessory(id="004", name="RF 15-35mm f/2.8L IS USM", brand="Canon", cost=950, lenter="Tham")
accessory5 = Accessory(id="005", name="Sigma 150-600mm f/5-6.3 DG OS HSM Contemporary", brand="Sony", cost=550, lenter="Team")
accessory6 = Accessory(id="006", name="OEM NP-F980, F970", brand="Sony", cost=50, lenter="Team")
accessory7 = Accessory(id="007", name="LP-E6NH", brand="Canon", cost=70, lenter="Photo")
accessory8 = Accessory(id="008", name="MKBFRA4-BH", brand="Manfrotto", cost=100, lenter="Photo")
accessory9 = Accessory(id="009", name="Q666", brand="Zomei", cost=80, lenter="Tham")

category_camera.add_accessory(accessory1)
category_camera.add_accessory(accessory2)
category_camera.add_accessory(accessory3)
category_len.add_accessory(accessory4)
category_len.add_accessory(accessory5)
category_battery.add_accessory(accessory6)
category_battery.add_accessory(accessory7)
category_tripod.add_accessory(accessory8)
category_tripod.add_accessory(accessory9)


#ADD_CUSTOMER
customer1 = Customer(customer_id="11015", email="sawabe@gmail.com", password="sawabebe", name="Sawabe", address="Gaegenamg1")
customer2 = Customer(customer_id="11046", email="kamatsu@gmail.com", password="kamikami", name="Kamitsuri", address="Suwannaphum")
customer3 = Customer(customer_id="12014",  email="12014@email.com", password="00001", name="Golf", address="Nakhon Si Thammarat")
Website.add_customer(customer1)
Website.add_customer(customer2)
Website.add_customer(customer3)


#ADD_CART
cart1 = Cart("001")
cart2 = Cart("002")
customer1.add_cart(cart1)
customer2.add_cart(cart2)
# ------------------------------------------------


# SEARCH
# Search by name
@app.get("/search_all_accessory_by/{brand}", tags=["Search"])
async def search_all_accessory_by_brand(brand:str) -> dict:
    #searching
    data = Website.search_accessory_by_name(input_name=brand)
    if data != None:
        accessory_data = []
        for accessory in data:
            accessory_data.append({
                "id": accessory.get_accessory_id(),
                "name": accessory.get_accessory_name(),
                "brand": accessory.get_accessory_brand(),
                "price": accessory.get_accessory_cost(),
                "lenter": accessory.get_accessory_lenter()
            })
        return {"data": accessory_data}
    else:
        return {"data": f"Don't have brand name '{brand}'"}
# Search by price
@app.get("/search_accessory_by_price/{min_price},{max_price}", tags=["Search"])
async def search_all_accessory_by_price(min_price:int, max_price:int) -> dict:
    data = Website.search_accessory_by_price(min_price=min_price, max_price=max_price)
    if data != None:
        accessory_data = []
        for accessory in data:
            accessory_data.append({
                "id": accessory.get_accessory_id(),
                "name": accessory.get_accessory_name(),
                "brand": accessory.get_accessory_brand(),
                "price": accessory.get_accessory_cost(),
                "lenter": accessory.get_accessory_lenter()
            })
        return {"data": accessory_data}
    else:
        return {"data": f"Dont have accessory in range {min_price} - {max_price}"}

# SHOPPING CART
# Get accessory in cart
@app.get("/your_shopping_cart/{customer_id}", tags=["Shopping Cart"])
async def your_shopping_cart(customer_id:str) -> dict:
    for customer in Website.get_list_customer():
        if customer_id == customer.get_customer_id():
            shopping_cart = customer.get_cart()
            accessory_data = []
            for accessory in shopping_cart.get_list_accessory_in_cart():
                accessory_data.append({
                    "id": accessory.get_accessory_id(),
                    "name": accessory.get_accessory_name(),
                    "brand": accessory.get_accessory_brand(),
                    "price": accessory.get_accessory_cost(),
                    "lenter": accessory.get_accessory_lenter(),
                })
            if len(shopping_cart.get_list_accessory_in_cart()) > 0:
                return {"data": accessory_data}
            else:
                return {"data": "You don't have any accessory in cart yet"}
        else:
            return {"data": f"Don't have customer id {customer_id}"}
# Add accessory to cart
@app.post("/add_to_cart/{customer_id},{accessory_id}", tags=["Shopping Cart"])
async def add_accessory_to_cart(customer_id:str, accessory_id:str) -> dict:
    # loop get cart from customer id
    for customer in Website.get_list_customer():
        if customer_id == customer.get_customer_id():
            shopping_cart = customer.get_cart()
            # add to cart
            accessory = Website.search_accessory_by_id(accessory_id)
            if accessory != None:
                shopping_cart.add_accessory_to_cart(accessory)
                return {"data": f"Accessory id {accessory_id} has been added to your cart"}
            else:
                return {"data": f"Don't have accessory id {accessory_id}"}
        else:
            return {"data": f"Don't have customer id {customer_id}"}
# Delete accessory in cart
@app.delete("/del_accessory_in_cart/{customer_id},{accessory_id}", tags=["Shopping Cart"])
async def delete_accessory_in_cart(customer_id:str, accessory_id:str) -> dict:
    for customer in Website.get_list_customer():
        if customer_id == customer.get_customer_id():
            shopping_cart = customer.get_cart()
            for accessory in shopping_cart.get_list_accessory_in_cart():
                if accessory_id == accessory.get_accessory_id():
                    shopping_cart.delete_accessory_in_cart(accessory)
                    return {"data": f"Accessory id {accessory_id} has been deleted from your cart"}
                else:
                    return {"data": f"You don't have accessory id {accessory_id} in your cart"}
        else:
            return {"data": f"Don't have customer id {customer_id}"}
# Clear accessory in cart
@app.delete("/clear_accessory_in_cart/{customer_id}", tags=["Shopping Cart"])
async def clear_accessory_in_cart(customer_id:str) -> dict:
    for customer in Website.get_list_customer():
        if customer_id == customer.get_customer_id():
            shopping_cart = customer.get_cart()
            shopping_cart.clear_accessory_in_cart()
            return {"data": "Your cart has been cleared"}
        else:
            return {"data": f"Don't have customer id {customer_id}"}


# ORDER
# Check Order
@app.get("/check_status_confirmed_order/{customer_id}", tags=["Confirm Order"])
async def check_status_confirmed_order(customer_id:str) -> dict:
    for customer in Website.get_list_customer():
        if customer_id == customer.get_customer_id():
            order_list = []
            for order in Website.get_list_order():
                if customer_id == order.get_customer_id():
                    accessory_data = []
                    reservation_accessory_data = order.get_list_reservation_accessory_in_order()
                    order_id = order.get_order_id()
                    order_status = order.get_order_status()
                    total_cost = order.get_total_cost()
                
                    for reservation_accessory in reservation_accessory_data:
                        accessory = reservation_accessory.get_reservation_accessory()
                        accessory_data.append({
                            "id": accessory.get_accessory_id(),
                            "name": accessory.get_accessory_name(),
                            "brand": accessory.get_accessory_brand(),
                            "price": accessory.get_accessory_cost(),
                            "lenter": accessory.get_accessory_lenter(),
                            "date start": reservation_accessory.get_date_start(),
                            "date end": reservation_accessory.get_date_end()
                        })
                    order_list.append({
                        "order id": order_id,
                        "status": order_status,
                        "data": accessory_data,
                        "total": total_cost
                    })
            if len(order_list) > 0:
                return {"data": order_list}
            else:
                return {"data": "You don't have any order yet"}
        else:
            return {"data": f"Don't have customer id {customer_id}"}
# Confirm Order
@app.post("/confirm_order/{customer_id},{date_start},{date_end}", tags=["Confirm Order"])
async def confirm_order(customer_id:str, date_start:str, date_end:str) -> dict:
    for customer in Website.get_list_customer():
        if customer_id == customer.get_customer_id():
            shopping_cart = customer.get_cart()
            if len(shopping_cart.get_list_accessory_in_cart()) > 0:
                order = (Order(status="undischarged", customer_id=customer_id))
                for accessory in shopping_cart.get_list_accessory_in_cart():
                    reservation_accessory = ReservationAccessory(reservation_accessory=accessory, date_start=date_start, date_end=date_end)
                    accessory.add_reservation_list(reservation_accessory)
                    order.add_reservation_accessory_in_order(reservation_accessory)
                Website.add_order(order)
                shopping_cart.clear_accessory_in_cart()
                return {"data": "Your order has been confirmed. Waiting for payment"}
            else:
                return {"data": "Your didn't add anything to your cart yet"}
    return {"data": f"Don't have customer id {customer_id}"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, log_level="info")