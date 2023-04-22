package com.thallyta.crudspring.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Length;

@Data
@Entity
@Table(name = "tb_courses")
@SQLDelete(sql = "UPDATE tb_courses SET status = 'Inactive' WHERE id = ?")
@Where(clause = "status = 'Active'")
public class Course {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @NotNull
    @Length(min = 5, max = 100)
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @NotBlank
    @NotNull
    @Length(max = 10)
    @Pattern(regexp = "Back-end|Front-end")
    @Column(name = "category", length = 10, nullable = false)
    private String category;

    @NotNull
    @Length(max = 10)
    @Pattern(regexp = "Active|Inactive")
    @Column(name = "status", length = 10, nullable = false)
    private String status = "Active";

}
