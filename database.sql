CREATE TABLE owners (
	id serial primary key,
	first_name VARCHAR(100),
	last_name VARCHAR(100)
);

CREATE TABLE pets (
	id serial primary key,
	pet_name VARCHAR(100),
	color VARCHAR(100),
	breed VARCHAR(100),
	owner_id INT REFERENCES owners
);

CREATE TABLE visits (
	id serial primary key,
	check_in TIMESTAMP DEFAULT NOW(),
	check_out TIMESTAMP DEFAULT NOW(),
	pet_id INT REFERENCES pets
);