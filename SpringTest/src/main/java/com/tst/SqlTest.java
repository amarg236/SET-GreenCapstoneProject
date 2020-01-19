package com.tst;
//based from https://spring.io/guides/gs/accessing-data-mysql/
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

//The whole class is a basic thing to throw data to and from a database
@Entity //Gets Hibernate to make tables with this class
public class SqlTest {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer n;//This is the id for rows. You can't use it really.
	private String txt;
	private String extra;
	
	public Integer getN() {
		return n;
	}
	public void setN(Integer n) {
		this.n = n;
	}
	public String getTxt() {
		return txt;
	}
	public void setTxt(String txt) {
		this.txt = txt;
	}
	public String getExtra() {
		return extra;
	}
	public void setExtra(String extra) {
		this.extra = extra;
	}
	
}
