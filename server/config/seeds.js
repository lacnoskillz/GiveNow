const db = require("./connection");
const fs = require('fs');
const path = require('path');
const Organization = require('../models/Organization');
const User = require('../models/User');
const bcrypt = require("bcrypt");
const organizationsData = [
  {
    name: "Green Cross",
    shortdescription: "Disaster relief program",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc mattis enim ut tellus elementum sagittis. Id velit ut tortor pretium viverra suspendisse potenti nullam. Malesuada pellentesque elit eget gravida cum sociis. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Id nibh tortor id aliquet lectus proin nibh nisl. Vitae semper quis lectus nulla at. Aliquam etiam erat velit scelerisque. Sagittis id consectetur purus ut faucibus pulvinar elementum integer. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. Nisl nunc mi ipsum faucibus vitae. Viverra ipsum nunc aliquet bibendum enim facilisis gravida. Ut consequat semper viverra nam. Interdum varius sit amet mattis vulputate. Pharetra convallis posuere morbi leo.",
    category: "Disaster Relief",
    image: 'test3.jpg',
  },
  {
    name: "Cat Corp",
    shortdescription: "Corp to save the cats!",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc mattis enim ut tellus elementum sagittis. Id velit ut tortor pretium viverra suspendisse potenti nullam. Malesuada pellentesque elit eget gravida cum sociis. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Id nibh tortor id aliquet lectus proin nibh nisl. Vitae semper quis lectus nulla at. Aliquam etiam erat velit scelerisque. Sagittis id consectetur purus ut faucibus pulvinar elementum integer. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. Nisl nunc mi ipsum faucibus vitae. Viverra ipsum nunc aliquet bibendum enim facilisis gravida. Ut consequat semper viverra nam. Interdum varius sit amet mattis vulputate. Pharetra convallis posuere morbi leo.",
    category: "Animal Welfare",
    image: 'test2.jpg',
  },
  {
    name: "Jungle Journey",
    shortdescription: "Save the animals of the jungles!",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc mattis enim ut tellus elementum sagittis. Id velit ut tortor pretium viverra suspendisse potenti nullam. Malesuada pellentesque elit eget gravida cum sociis. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Id nibh tortor id aliquet lectus proin nibh nisl. Vitae semper quis lectus nulla at. Aliquam etiam erat velit scelerisque. Sagittis id consectetur purus ut faucibus pulvinar elementum integer. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. Nisl nunc mi ipsum faucibus vitae. Viverra ipsum nunc aliquet bibendum enim facilisis gravida. Ut consequat semper viverra nam. Interdum varius sit amet mattis vulputate. Pharetra convallis posuere morbi leo.",
    category: "Environmental",
    image: 'test4.jpg',
  },
  {
    name: "Enlighten Explosion",
    shortdescription: "Teaching the youth for a better tomorrow",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc mattis enim ut tellus elementum sagittis. Id velit ut tortor pretium viverra suspendisse potenti nullam. Malesuada pellentesque elit eget gravida cum sociis. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Id nibh tortor id aliquet lectus proin nibh nisl. Vitae semper quis lectus nulla at. Aliquam etiam erat velit scelerisque. Sagittis id consectetur purus ut faucibus pulvinar elementum integer. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. Nisl nunc mi ipsum faucibus vitae. Viverra ipsum nunc aliquet bibendum enim facilisis gravida. Ut consequat semper viverra nam. Interdum varius sit amet mattis vulputate. Pharetra convallis posuere morbi leo.",
    category: "Education",
    image: 'education.jpg',
  },
  {
    name: "Happy Healthy Hooray!",
    shortdescription: "eat better feel better",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc mattis enim ut tellus elementum sagittis. Id velit ut tortor pretium viverra suspendisse potenti nullam. Malesuada pellentesque elit eget gravida cum sociis. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Id nibh tortor id aliquet lectus proin nibh nisl. Vitae semper quis lectus nulla at. Aliquam etiam erat velit scelerisque. Sagittis id consectetur purus ut faucibus pulvinar elementum integer. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. Nisl nunc mi ipsum faucibus vitae. Viverra ipsum nunc aliquet bibendum enim facilisis gravida. Ut consequat semper viverra nam. Interdum varius sit amet mattis vulputate. Pharetra convallis posuere morbi leo.",
    category: "Healthcare",
    image: 'health.jpg',
  },
  // Add more organizations as needed
];
const uploadsFolderPath = path.join(__dirname, '../../', 'client', 'public', 'uploads');

const deleteFilesInUploadsFolder = () => {
  if (!fs.existsSync(uploadsFolderPath)) {
    console.log('The uploads folder does not exist. No files to delete.');
    return;
  }

  fs.readdirSync(uploadsFolderPath).forEach(file => {
    const filePath = path.join(uploadsFolderPath, file);
    fs.unlinkSync(filePath);
  });

  console.log('Files in uploads folder deleted.');
};


const seedDatabase = async () => {
  try {
    await Organization.deleteMany();
    await Organization.insertMany(organizationsData);
    await User.deleteMany();
    await User.insertMany([
      {
        username: 'Kai',
        email: 'Kaiadmin@example.com',
        password: await bcrypt.hash('password12345', 10),
        isAdmin: true,
      },
    ]);

    console.log('Users Seeded');

    // Delete files in the uploads folder
    deleteFilesInUploadsFolder();

    console.log('Organizations seeded, users reset, and files in uploads folder deleted.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
};

db.once('open', seedDatabase);

