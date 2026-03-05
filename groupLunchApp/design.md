Great — based on your answers I’ll draft a **clean technical design doc** similar to what an engineering team would review before implementation.

Since this is a **prototype**, the design will emphasize **simplicity, speed of development, and minimal infrastructure**.

I'll assume the following stack unless you want to change it:

* **Frontend:** Next.js
* **UI Library:** Material UI
* **Restaurant Data:** Yelp Fusion API
* **State Management:** React state / context
* **Hosting:** Vercel

If you prefer **Google Places** instead of Yelp we can swap it easily.

---

# Technical Design Document

**Product:** Group Lunch Ordering App
**Version:** Prototype (Clickable MVP)

---

# 1. System Overview

The Group Lunch Ordering App enables teams to:

* Discover nearby restaurants
* Filter options based on dietary restrictions and cuisine
* Review ratings and common keywords
* Select a restaurant
* Allow multiple team members to add their individual orders

This is a **client-heavy prototype web application** that uses a third-party API to fetch restaurant data and temporarily stores group orders in browser memory.

No authentication, persistence, or real-time synchronization is required.

---

# 2. High-Level Architecture

Architecture will follow a **simple client-server pattern**.

```
Browser
   |
   v
Next.js Web App
   |
   v
API Route (Next.js backend)
   |
   v
Restaurant Data API (Yelp)
```

### Responsibilities

**Frontend (Next.js)**

* UI rendering
* Filtering and sorting
* Managing group order state
* Collecting user orders

**Next.js API Routes**

* Proxy requests to Yelp API
* Normalize restaurant data

**External API**

* Restaurant search
* Ratings
* Cuisine type
* price range
* review keyword extraction (if available)

---

# 3. Key User Flows

### Flow 1 — Discover Restaurants

1. User opens application
2. Browser requests geolocation
3. App calls backend API `/restaurants`
4. Backend fetches restaurants near coordinates
5. Results displayed in restaurant list

---

### Flow 2 — Filter Restaurants

1. User selects filters
2. Frontend applies filters locally
3. Restaurant list updates dynamically

Filters include:

* cuisine
* dietary restrictions
* price range
* rating
* delivery time

---

### Flow 3 — Create Group Order

1. User selects restaurant
2. Group order page opens
3. Users add their name + order items
4. Order list updates
5. Group sees full consolidated order

---

# 4. Frontend Architecture

### Pages

| Page                    | Purpose              |
| ----------------------- | -------------------- |
| `/`                     | Restaurant discovery |
| `/restaurant/[id]`      | Restaurant details   |
| `/order/[restaurantId]` | Group order page     |

---

### Component Structure

```
App
 ├── Layout
 ├── RestaurantSearchPage
 │     ├── LocationBanner
 │     ├── FilterPanel
 │     ├── RestaurantList
 │     │      └── RestaurantCard
 │
 ├── RestaurantDetailPage
 │     ├── RestaurantHeader
 │     ├── ReviewKeywords
 │     └── StartOrderButton
 │
 └── GroupOrderPage
       ├── OrderForm
       ├── OrderList
       └── OrderSummary
```

---

# 5. State Management

Because this is a prototype, we will use **React Context + local state**.

Global state will store:

```
AppState
{
  location
  restaurants[]
  filters
  selectedRestaurant
  groupOrders[]
}
```

Example group order structure:

```
groupOrders: [
  {
    name: "Alex",
    items: [
      "Chicken shawarma",
      "Falafel"
    ]
  },
  {
    name: "Sam",
    items: [
      "Sushi combo"
    ]
  }
]
```

Orders exist only in memory and reset when page refreshes.

---

# 6. Backend API Design

Using **Next.js API routes** as a proxy layer.

---

## Endpoint: Get Restaurants

```
GET /api/restaurants
```

Query parameters:

```
lat
lng
cuisine
price
rating
```

Example request

```
/api/restaurants?lat=33.89&lng=-84.29
```

Example response

```
[
  {
    id: "123",
    name: "Mediterranean Grill",
    cuisine: "Mediterranean",
    rating: 4.5,
    price: "$$",
    deliveryTime: 30,
    keywords: ["fresh", "large portions", "fast delivery"]
  }
]
```

---

# 7. Restaurant Data Integration

The system will use the **Yelp Fusion API** to retrieve restaurant data.

Data mapping:

| Yelp Field  | App Field       |
| ----------- | --------------- |
| name        | restaurant name |
| categories  | cuisine type    |
| rating      | rating          |
| price       | price level     |
| coordinates | location        |

Keywords may be generated from Yelp review snippets.

---

# 8. Filtering Logic

Filtering will occur **client-side** after restaurant data is retrieved.

Example filter logic:

```
filteredRestaurants = restaurants
  .filter(matchesCuisine)
  .filter(matchesDietaryRestrictions)
  .filter(matchesPrice)
```

This reduces API calls and keeps the UI responsive.

---

# 9. UI Design Considerations

### Restaurant Card

Displays:

* restaurant name
* cuisine
* rating
* price level
* estimated delivery time
* review keywords

---

### Filters Panel

Includes:

* cuisine dropdown
* dietary restrictions
* price range
* rating filter

---

### Group Order Interface

Users can:

* enter name
* add order items
* view all submitted orders

---

# 10. Performance Considerations

For a prototype:

* Cache restaurant results in state
* Limit results to ~20 restaurants
* Use pagination if needed

---

# 11. Deployment

Application deployed to:

**Hosting:** Vercel

Deployment flow:

```
GitHub repo
     |
     v
Vercel build
     |
     v
Live prototype
```

---

# 12. Non-Goals (Prototype)

Not included in this version:

* authentication
* payment processing
* delivery integrations
* real-time collaboration
* persistent storage

---

# 13. Future Enhancements

Potential future features:

* live collaborative orders
* Slack / Teams integration
* menu browsing
* AI restaurant recommendations
* order voting
* automatic order submission

---

✅ If you'd like, I can also help you add **three sections that make this design doc look *very senior-level***:

1. **Database schema (even if mocked)**
2. **Sequence diagrams for restaurant search and group ordering**
3. **Low-fidelity wireframes for the UI**

Those are often what **engineering leaders expect in a design review.**
