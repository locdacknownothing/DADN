CREATE TABLE
    IF NOT EXISTS user(
        id INTEGER,
        name VARCHAR(50),
        img_url VARCHAR(100),
        role TINYINT,
        PRIMARY KEY(id)
    );

CREATE TABLE
    IF NOT EXISTS timesheet (
        id INTEGER NOT NULL,
        _date DATE,
        check_in TIMESTAMP,
        check_out TIMESTAMP NULL,
        PRIMARY KEY (id, _date),
        Foreign Key (id) REFERENCES user(id)
    );

CREATE TABLE
    IF NOT EXISTS account (
        id INTEGER NOT NULL,
        email VARCHAR(50),
        password VARCHAR(50),
        PRIMARY KEY (email),
        Foreign Key (id) REFERENCES user(id)
    );

/* INIT DATA */
INSERT INTO user
VALUES
    (0, "Lê Tấn Lộc", "face_db/loc.jpg", 1),
    (1, "Huỳnh Đại Vinh", "face_db/vinh.jpg", 0),
    (2, "Lalisa Manoban", "face_db/lisa.jpg", 0),
    (3, "Trấn Thành", "face_db/tran_thanh.jpg", 0),
    (4, "Nguyễn Quang Khánh", "face_db/nemesis.jpg", 0);

INSERT INTO account
VALUES
    (0, "loc@pasic.com", "admin"),
    (1, "vinh@pasic.com", "notadmin"),
    (2, "lisa@pasic.com", "notadmin"),
    (3, "thanh@pasic.com", "notadmin"),
    (4, "khanh@pasic.com", "notadmin");

INSERT INTO timesheet
VALUES
    (0,"2023-04-28", 1682643637, 1682676876),
    (1,"2023-04-28", 1682647597, 1682680351),
    (2,"2023-04-28", 1682644678, 1682677155),
    (3,"2023-04-28", 1682643987, 1682678820),
    (4,"2023-04-28", 1682644123, 1682676352),
    (0,"2023-05-01", 1682903673, 1682936301),
    (1,"2023-05-01", 1682907239, 1682936001),
    (2,"2023-05-01", 1682907246, 1682936213),
    (4,"2023-05-01", 1682907252, 1682936312);
