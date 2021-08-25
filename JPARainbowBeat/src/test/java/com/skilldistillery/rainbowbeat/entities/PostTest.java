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

class PostTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Post post;
	

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
		post = em.find(Post.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		post = null;
	}

	@Test
	@DisplayName("Testing post entity")
	void test1() {
		assertNotNull(post);
		assertEquals("Newest Lorde Album", post.getTitle());
	}
	
	@Test
	@DisplayName("Post to Song Mapping Test")
	void test2() {
		assertNotNull(post);
		assertNotNull(post.getSong());
		assertEquals("Solar Power", post.getSong().getTitle());
	}
	
	@DisplayName("Post to User Mapping Test")
	void test3() {
		assertNotNull(post);
		assertNotNull(post.getUser());
		assertEquals("admin", post.getUser().getUsername());
	}
	
	@DisplayName("Post to Rating Mapping Test")
	void test4() {
		assertNotNull(post);
		assertNotNull(post.getRatings());
		assertEquals(1, post.getRatings().size());
	}
	
	@DisplayName("Post to Comment Mapping Test")
	void test5() {
		assertNotNull(post);
		assertNotNull(post.getComments());
		assertEquals(1, post.getComments().size());
	}

}
