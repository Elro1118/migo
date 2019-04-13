﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using content;

namespace content.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20190411151445_AddLogitudeLatitudeClientTable")]
    partial class AddLogitudeLatitudeClientTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.0-rtm-35687")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("migo.Pages.Model.Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Active");

                    b.Property<DateTime?>("DateCreated");

                    b.Property<string>("Email");

                    b.Property<DateTime?>("LastLoggedIn");

                    b.Property<string>("Name");

                    b.Property<string>("Password");

                    b.Property<int>("RolId");

                    b.Property<string>("Telephone");

                    b.HasKey("Id");

                    b.HasIndex("RolId");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("migo.Pages.Model.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Active");

                    b.Property<string>("Description");

                    b.Property<int>("localId");

                    b.HasKey("Id");

                    b.HasIndex("localId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("migo.Pages.Model.Local", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Active");

                    b.Property<string>("Address");

                    b.Property<string>("City");

                    b.Property<int>("ClientId");

                    b.Property<double?>("Latitude");

                    b.Property<double?>("Longitude");

                    b.Property<string>("Name");

                    b.Property<string>("Schedule");

                    b.Property<string>("State");

                    b.Property<int>("Zipcode");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.ToTable("Locals");
                });

            modelBuilder.Entity("migo.Pages.Model.Rol", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("type");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("migo.Pages.Model.Volunteer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("Name");

                    b.Property<string>("Photo");

                    b.Property<string>("Telephone");

                    b.Property<int>("localId");

                    b.HasKey("Id");

                    b.HasIndex("localId");

                    b.ToTable("Volunteers");
                });

            modelBuilder.Entity("migo.Pages.Model.Client", b =>
                {
                    b.HasOne("migo.Pages.Model.Rol", "Rol")
                        .WithMany("Clients")
                        .HasForeignKey("RolId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("migo.Pages.Model.Comment", b =>
                {
                    b.HasOne("migo.Pages.Model.Local", "Local")
                        .WithMany("Comments")
                        .HasForeignKey("localId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("migo.Pages.Model.Local", b =>
                {
                    b.HasOne("migo.Pages.Model.Client", "Client")
                        .WithMany("Locals")
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("migo.Pages.Model.Volunteer", b =>
                {
                    b.HasOne("migo.Pages.Model.Local", "Local")
                        .WithMany("Volunteers")
                        .HasForeignKey("localId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}