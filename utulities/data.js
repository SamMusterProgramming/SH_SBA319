

const users =[
    {
            id:1,
            name: "will junior  Smith",
            profile_img: "/static/materials/avatar.avif",
            email: "johnSmith2020@gmail.com",
            password: "johnsmith",
            username: "smithJ2024"
        
    },
    {
            id:2,
            name: "Samir Haddadi",
            profile_img: "/static/materials/avatar.avif",
            email: "samcoeur2020@gmail.com",
            password: "samir",
            username: "samcoeur"
        
    }

]

const posts =[
     {
        id:1,
        user_id:1,
        image_url:"static/materials/samir.jpeg",
        desc: "my first post , Hello"
     },
     {
        id:2,
        user_id:1,
        image_url:"static/materials/samir.jpeg",
        desc: "my second post , Hello world"
     }

]

module.exports = { users ,posts };