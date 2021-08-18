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

class PlaylistTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Playlist playlist;
	
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
		playlist = em.find(Playlist.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		playlist = null;
	}

	@Test
	@DisplayName("Playlist Entity Test")
	void test1() {
		assertNotNull(playlist);
		assertEquals("Pony Beats", playlist.getTitle());
	}
	
	@Test
	@DisplayName("Playlist to Song Mapping Test")
	void test2() {
		assertNotNull(playlist);
		assertNotNull(playlist.getUser());
		assertEquals("admin", playlist.getUser().getUsername());
	}

}
