const db = require("../config/db");

exports.getDashboard = async () => {

    const [[products]] =
        await db.query("SELECT COUNT(*) total FROM Products");

    const [[customers]] =
        await db.query("SELECT COUNT(*) total FROM Customers");

    const [[orders]] =
        await db.query("SELECT COUNT(*) total FROM Orders");

    const [[sales]] =
        await db.query("SELECT IFNULL(SUM(total_amount),0) revenue FROM Sales");

    const [recentSales] =
        await db.query(`
            SELECT
                s.sale_id,
                c.full_name,
                s.total_amount,
                s.sale_date
            FROM Sales s
            JOIN Customers c
            ON s.customer_id=c.customer_id
            ORDER BY s.sale_id DESC
            LIMIT 5
        `);

    const [recentOrders] =
        await db.query(`
            SELECT
                order_id,
                total_amount,
                order_status
            FROM Orders
            ORDER BY order_id DESC
            LIMIT 5
        `);

    const [recentBookings] =
        await db.query(`
            SELECT
                booking_id,
                booking_status,
                booking_date
            FROM Bookings
            ORDER BY booking_id DESC
            LIMIT 5
        `);

    return {

        products: products.total,

        customers: customers.total,

        orders: orders.total,

        revenue: sales.revenue,

        recentSales,

        recentOrders,

        recentBookings

    };

};