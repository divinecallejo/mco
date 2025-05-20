// login
let users = [
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" }
];

// bus category
let buses = {
    luxury: [
        { busName: "Luxury-21", price: 500, availableSeats: 30 },
        { busName: "Luxury-22", price: 500, availableSeats: 30 },
        { busName: "Luxury-23", price: 500, availableSeats: 30 },
        { busName: "Luxury-24", price: 500, availableSeats: 30 }
    ],
    aircon: [
        { busName: "Aircon-31", price: 400, availableSeats: 30 },
        { busName: "Aircon-32", price: 400, availableSeats: 30 },
        { busName: "Aircon-33", price: 400, availableSeats: 30 },
        { busName: "Aircon-34", price: 400, availableSeats: 30 }
    ],
    minibus: [
        { busName: "Mini-41", price: 300, availableSeats: 20 },
        { busName: "Mini-42", price: 300, availableSeats: 20 },
        { busName: "Mini-43", price: 300, availableSeats: 20 },
        { busName: "Mini-44", price: 300, availableSeats: 20 }
    ],
    uvx: [
        { busName: "UVX-51", price: 600, availableSeats: 25 },
        { busName: "UVX-52", price: 600, availableSeats: 25 },
        { busName: "UVX-53", price: 600, availableSeats: 25 },
        { busName: "UVX-54", price: 600, availableSeats: 25 }
    ]
};

// reservations
let reservations = [];

// login
function login() {
    let username = prompt("Enter username:");
    let password = prompt("Enter password:");
    for (let user of users) {
        if (user.username === username && user.password === password) {
            alert("Login successful!");
            return username;
        }
    }
    alert("Invalid credentials.");
    return null;
}

// choose category
function chooseCategory() {
    let category = prompt("Choose category (luxury, aircon, minibus, uvx):").toLowerCase();
    if (!buses[category]) {
        alert("Invalid category.");
        return null;
    }

    let list = "Available buses:\n";
    buses[category].forEach((bus, i) => {
        list += ${i + 1}. ${bus.busName} - ₱${bus.price} - Seats: ${bus.availableSeats}\n;
    });
    alert(list);

    let busIndex = parseInt(prompt("Choose a bus number:")) - 1;
    if (busIndex < 0 || busIndex >= buses[category].length) {
        alert("Invalid bus selection.");
        return null;
    }

    return { category, busIndex };
}

// reserve a seat
function reserveSeat(name, category, busIndex) {
    let seatNumber = prompt("Enter seat number to reserve:");
    let bus = buses[category][busIndex];

    for (let r of reservations) {
        if (r.passenger === name && r.busName === bus.busName && r.seatNumber === seatNumber) {
            alert("Seat already reserved by you.");
            return;
        }
    }

    if (bus.availableSeats <= 0) {
        alert("No seats left.");
        return;
    }

    reservations.push({
        passenger: name,
        category,
        busName: bus.busName,
        seatNumber,
        price: bus.price,
        paid: false,
        paymentPhoto: null
    });

    bus.availableSeats--;
    alert("Seat reserved successfully!");
}

// cancel reservation
function cancelSeat(name) {
    let busName = prompt("Enter bus name to cancel:");
    let seatNumber = prompt("Enter seat number to cancel:");

    for (let i = 0; i < reservations.length; i++) {
        let r = reservations[i];
        if (r.passenger === name && r.busName === busName && r.seatNumber === seatNumber) {
            reservations.splice(i, 1);

            for (let cat in buses) {
                for (let j = 0; j < buses[cat].length; j++) {
                    if (buses[cat][j].busName === busName) {
                        buses[cat][j].availableSeats++;
                        alert("Reservation canceled.");
                        return;
                    }
                }
            }
        }
    }

    alert("Reservation not found.");
}

// make payment
function makePayment(name) {
    let busName = prompt("Enter bus name for payment:");
    let seatNumber = prompt("Enter seat number for payment:");
    let photo = prompt("Enter payment photo filename or URL:");

    for (let r of reservations) {
        if (r.passenger === name && r.busName === busName && r.seatNumber === seatNumber) {
            r.paid = true;
            r.paymentPhoto = photo;
            alert("Payment completed.");
            return;
        }
    }

    alert("Reservation not found.");
}

// view reservations
function printReservations() {
    if (reservations.length === 0) {
        alert("No reservations yet.");
        return;
    }

    let result = "";
    reservations.forEach(r => {
        result += Passenger: ${r.passenger}\nBus: ${r.busName} (${r.category})\nSeat: ${r.seatNumber}\nPrice: ₱${r.price}\nPaid: ${r.paid ? "Yes" : "No"}\nPhoto: ${r.paymentPhoto || "None"}\n-----\n;
    });

    alert(result);
}

// menu where the options are made
function main() {
    let user = login();
    if (!user) return;

    while (true) {
        let choice = prompt(
            "Choose an option:\n1. Reserve a seat\n2. Cancel reservation\n3. Make payment\n4. View reservations\n5. Exit"
        );

        switch (choice) {
            case "1":
                let selection = chooseCategory();
                if (selection) {
                    reserveSeat(user, selection.category, selection.busIndex);
                }
                break;
            case "2":
                cancelSeat(user);
                break;
            case "3":
                makePayment(user);
                break;
            case "4":
                printReservations();
                break;
            case "5":
                alert("Goodbye!");
                return;
            default:
                alert("Invalid choice.");
        }
    }
}

main();
