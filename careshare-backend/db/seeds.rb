# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


#HEY HEY in the app flow, I should be using Date.current which would always set the date to the correct moment the shift was started
Shift.create(caregiver: "Tom", date: Date.parse("2020-03-15"))
Shift.create(caregiver: "Gigi", date: Date.parse("2020-05-06"))
Shift.create(caregiver: "Bompa", date: Date.parse("2020-07-26"))
Shift.create(caregiver: "Auntie Kim", date: Date.parse("2020-10-13"))
Shift.create(caregiver: "Taylor", date: Date.parse("2020-11-16"))
