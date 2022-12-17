# Forgotten Treasures (Semester-Project-2)

![Homepage Preview](/planning_and_design/images/site_readme_image.jpg)

## Project Brief

Forgotten Treasures is an online auction website, where users can bid on and setup auctions. Unregistered users are able to browse and view listings. Register users are able to bid on, create and update listings, view their profile and update their avatar image.
An auction site is looking to launch a website where users can add items to be bid on and bid on items other users have put up for auction.

### User Stories

The project covers these user stories;

- [x] A user with a stud.noroff.no email may register
- [x] A registered user may login
- [x] A registered user may logout
- [x] A registered user may update their avatar
- [x] A registered user may view their total credit
- [x] A registered user may create a Listing with a title, deadline date, media gallery and description
- [x] A registered user may add a Bid to another user’s Listing
- [x] A registered user may view Bids made on a Listing
- [x] A registered user may use credit to make a Bid on another user’s Listing
- [x] An unregistered user may search through Listings

## Built With

<img src="https://skillicons.dev/icons?i=html,sass,js,bootstrap"/>

- HTML 5
- Sass
- Bootstrap
- JavaScript

### Designed in

<img src="https://skillicons.dev/icons?i=xd"/>

- Adobe XD

## Getting Started

Download and extract the zip file or clone the project in the command line from your preferred editor.

```
git clone https://github.com/Anclagen/Semester-Project-2.git
```

Then install the projects dependencies with;

```
npm i
```

and compile the css using;

```
npm run start
```

### Hosting

The project is configured to run on GitHub pages using the provided workflow. For hosting else where further configuration will be require to import the Bootstrap JS either through a bundler, or by replacing the bootstrap node modules script link with the CDN link.

## Automated Testing Cypress

Before you begin testing you will need to register an account, and use those details to fill out the .env file following the example template.

To run these tests you can use this command to open Cypress,

```
npm run test-e2e
```

Due to rate limiting on the API it is advisable to avoid using the `npm run test-e2e-cli` command line testing as this will attempt to run through all the tests and result in a server time out of 1 minute.

There are currently 4 test files for cypress, all tests passing on v0.7.0, further alteration may be required as of error handling updates from v0.8.0.

- Authentication Tests
  - Tests login and logout.
  - Tests login failure message return.
  - Tests validation for `@stud.noroff.no` emails.
  - Tests password validation.
  - Tests form toggle.
- Profile Tests
  - Tests user can see their balance.
  - Tests user can update their avatar image.
  - Test error returned for bad image links.
- Create and Update Listings Test
  - Tests user can create and delete listing.
  - Tests user can create and update listing.
  - Tests form validation for; title, description, tags, media, and end time.
- Bidding Tests
  - Tests user can bid and view winning user.
  - Tests unregistered user can't bid.
  - Tests error handling.

## Contributing

If you experience any errors feel free to add issues, or open up a pull request with suggested changes. Likewise if there are features you would like to suggest feel free.

## Contact

[<img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white">](https://discordapp.com/users/178264761199362048)

[<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">](https://www.linkedin.com/in/alexander-barrett-64568a47/)

[<img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white">](mailto:alexanderbarrett189@gmail.com)

## License

This project is licensed under a Creative Commons license. It is open for contributions, but please credit the project if you use the code in your own projects.

## Required Links

<table>
  <thead>
    <tr>
      <th>Resource</th>
      <td>URL</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Gantt Chart</th>
      <td><a href="https://raw.githubusercontent.com/Anclagen/Semester-Project-2/main/planning_and_design/Gantt%20Chart%20Images/TeamGanttChart.jpg">Gantt Chart Image</a></td>
    </tr>
    <tr>
      <th>Design Prototype</th>
      <td><a href="https://xd.adobe.com/view/a6dadd77-9ac4-4eb6-8244-130bfa0a4ade-f389/">Desktop Prototype</a> </br>
      <a href="https://xd.adobe.com/view/1672b6ba-0ca5-42ce-8288-6eb261c44223-4321/">Mobile Prototype</a></td>
    </tr>
    <tr>
      <th>Style Guide</th>
      <td><a href="https://xd.adobe.com/view/666988e0-4582-49ce-b57f-dae078f5507c-333a/">Style Guide</a></td>
    </tr>
    <tr>
      <th>Kanban Board</th>
      <td><a href="https://github.com/users/Anclagen/projects/2/views/6?layout=board">Project Board Link</a></td>
    </tr>
    <tr>
      <th>Repository</th>
      <td><a href="https://github.com/Anclagen/Semester-Project-2">Project Repository</a></td>
    </tr>
    <tr>
      <th>Hosted Demo</th>
      <td><a href="https://anclagen.github.io/Semester-Project-2/">Live Site</a></td>
    </tr>
  </tbody>
</table>
