# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


#HEY HEY in the app flow, I should be using Date.current which would always set the date to the correct moment the shift was started
tom = Shift.create(caregiver: "Tom", date: Date.parse("2020-01-15"))
gigi = Shift.create(caregiver: "Gigi", date: Date.parse("2020-02-06"))
bompa = Shift.create(caregiver: "Bompa", date: Date.parse("2020-03-26"))
kim = Shift.create(caregiver: "Auntie Kim", date: Date.parse("2019-12-13"))
sarah = Shift.create(caregiver: "Sarah", date: Date.parse("2020-03-14"))

tom.diapers.create(wet: true, soiled: false, time: "08:30")
tom.diapers.create(wet: false, soiled: true, time: "10:30")
tom.diapers.create(wet: true, soiled: true, time: "12:45")
tom.sleeps.create(nap: true, bedtime: false, start: "12:30", end: "13:45")
tom.foods.create(snack: false, breakfast: true, lunch: false, dinner: false, description: "Cheesy Eggs and Toast", time: "07:44")
tom.foods.create(snack: true, breakfast: false, lunch: false, dinner: false, description: "Green pouch and avocado", time: "16:44")
tom.notes.create(content: "Lots of energy today!")

sarah.diapers.create(wet: true, soiled: false, time: "07:30")
sarah.diapers.create(wet: true, soiled: true, time: "12:00")
sarah.sleeps.create(nap: true, bedtime: false, start: "12:15", end: "13:55")
sarah.foods.create(snack: false, breakfast: false, lunch: true, dinner: false, description: "Quesadilla and Pineapple", time: "13:10")
sarah.foods.create(snack: true, breakfast: false, lunch: false, dinner: false, description: "Goldfish and Hummus", time: "15:30")
sarah.notes.create(content: "Minor congestion in the morning, cleared up around noon")

gigi.diapers.create(wet: false, soiled: true, time: "18:30")
gigi.sleeps.create(nap: false, bedtime: true, start: "20:15", end: "07:15")
gigi.foods.create(snack: false, breakfast: false, lunch: false, dinner: true, description: "Black Sea Bass with Spinach", time: "19:10")
gigi.foods.create(snack: true, breakfast: false, lunch: false, dinner: false, description: "Chocolate Chip Cookie", time: "19:55")
gigi.notes.create(content: "Looks like she needs more time with her Grandma!")

bompa.diapers.create(wet: false, soiled: true, time: "14:45")
bompa.foods.create(snack: false, breakfast: false, lunch: false, dinner: true, description: "Fettucine Carbonara", time: "17:45")
bompa.foods.create(snack: true, breakfast: false, lunch: false, dinner: false, description: "Salt and Vinegar Chips", time: "15:45")
bompa.notes.create(content: "Very excited to play with Play-Doh machine")



kim.foods.create(snack: true, breakfast: false, lunch: false, dinner: false, description: "About 400 jellybeans", time: "19:10")
kim.foods.create(snack: true, breakfast: false, lunch: false, dinner: false, description: "Six handfuls of cookie dough", time: "19:55")
kim.notes.create(content: "Snack time with Auntie Kim!!!")


