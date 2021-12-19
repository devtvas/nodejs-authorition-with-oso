class Repository {
  constructor(name, isPublic = false) {
    this.name = name;
    this.isPublic = isPublic;
  }

  static getByName(name) {
    return repos_db[name];
  }
}

class Role {
  constructor(name, repository) {
    this.name = name;
    this.repository = repository;
  }
}

class User {
  constructor(roles) {
    this.roles = roles;
  }

  static getCurrentUser() {
    return users_db["larry"];
    // return users_db["anne"];
    // return users_db["graham"];
  }
}

const repos_db = {
  gmail: new Repository("gmail", false),
  react: new Repository("react", true),
  oso: new Repository("oso"),
};

const users_db = {
  larry: new User([new Role("admin", repos_db["gmail"])]),
  anne: new User([new Role("maintainer", repos_db["react"])]),
  graham: new User([new Role("contributor", repos_db["oso"])]),
};

module.exports = { Repository, User };
