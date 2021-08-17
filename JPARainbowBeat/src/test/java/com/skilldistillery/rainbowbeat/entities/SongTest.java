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

class SongTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Song song;
	
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
		song = em.find(Song.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		song = null;
	}

	@Test
	@DisplayName("Song Entity Test")
	void test1() {
		assertNotNull(song);
		assertEquals("My Little Pony Theme Song", song.getTitle());
	}
	
	@Test
	@DisplayName("Song to User Mapping Test")
	void test2() {
		assertNotNull(song);
		assertNotNull(song.getUser());
		assertEquals("admin", song.getUser().getUsername());
	}

}
