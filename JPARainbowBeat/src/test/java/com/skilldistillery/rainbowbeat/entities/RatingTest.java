package com.skilldistillery.rainbowbeat.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class RatingTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Rating rating;
	private RatingId rid;

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
		rid = new RatingId();
		rid.setPostId(1);;
		rid.setUserId(2);;
		rating = em.find(Rating.class, rid);
	}

	@AfterEach
	void tearDown() throws Exception {
		rating = null;
		rid = null;
		em.close();
	}

	@Test
	@DisplayName("testing rating true false")
	void test1() {
		assertNotNull(rating);
		assertTrue(rating.isRating());
	}
	
	@Test
	@DisplayName("testing rating to user mapping")
	void test2() {
		assertNotNull(rating);
		assertEquals("ponyman", rating.getUser().getUsername());
	}
	
	@Test
	@DisplayName("testing rating to user mapping")
	void test3() {
		assertNotNull(rating);
		assertEquals("Fresh Pony Song", rating.getPost().getTitle());
	}

}
