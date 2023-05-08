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
    (4,"2023-05-01", 1682907252, 1682936312),
(0, '2023-05-02', 1682989597.217993, 1683022826.250894),
(1, '2023-05-02', 1682989139.6741936, 1683024970.24126),
(2, '2023-05-02', 1682988943.903496, 1683023308.0502155),
(3, '2023-05-02', 1682988751.196987, 1683023932.6093416),
(4, '2023-05-02', 1682989029.1879659, 1683023525.4144413),
(0, '2023-05-03', 1683075469.0624323, 1683108821.3121266),
(1, '2023-05-03', 1683076003.2794063, 1683107447.15699),
(2, '2023-05-03', 1683075655.2375464, 1683108688.64354),
(3, '2023-05-03', 1683075985.8721464, 1683111109.3442755),
(4, '2023-05-03', 1683075823.9595385, 1683107785.7266386),
(0, '2023-05-04', 1683162261.1938837, 1683195393.7314162),
(1, '2023-05-04', 1683161610.2659256, 1683194162.116298),
(2, '2023-05-04', 1683162361.025172, 1683197987.2030578),
(3, '2023-05-04', 1683162253.6148357, 1683197128.031976),
(4, '2023-05-04', 1683162491.3878725, 1683196832.9217658),
(0, '2023-05-05', 1683248554.8366601, 1683282835.6173453),
(1, '2023-05-05', 1683247970.7867258, 1683283293.224958),
(2, '2023-05-05', 1683248656.0506468, 1683281357.3845623),
(3, '2023-05-05', 1683248376.3762636, 1683282716.4851682),
(4, '2023-05-05', 1683247915.14919, 1683281063.9890132),
(0, '2023-05-06', 1683334962.6035402, 1683367801.3114297),
(1, '2023-05-06', 1683334841.481708, 1683371307.0992284),
(2, '2023-05-06', 1683334269.2575998, 1683366869.3398871),
(3, '2023-05-06', 1683334507.6405911, 1683368286.1789474),
(4, '2023-05-06', 1683334590.229519, 1683371083.4214237),
(0, '2023-05-07', 1683421696.1778708, 1683453216.697804),
(1, '2023-05-07', 1683420702.775725, 1683453216.8194137),
(2, '2023-05-07', 1683420667.0204887, 1683454693.6321933),
(3, '2023-05-07', 1683421015.2513099, 1683455636.0017729),
(4, '2023-05-07', 1683421346.6510036, 1683457323.8280284);