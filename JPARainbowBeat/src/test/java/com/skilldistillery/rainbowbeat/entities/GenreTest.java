package com.skilldistillery.rainbowbeat.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class GenreTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Genre genre;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPARainbowBeat");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		genre = em.find(Genre.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		genre = null;
	}

	@Test
	@DisplayName("Genre Entity Test")
	void test1() {
		assertNotNull(genre);
		assertEquals("Pony Music", genre.getName());
	}
	
	@Test
	@DisplayName("Genre to Song Mapping Test")
	void test2() {
		assertNotNull(genre);
		assertNotNull(genre.getSongs());
		assertEquals("Rainbow Chill Beats", genre.getSongs().get(1).getTitle());
	}

}
