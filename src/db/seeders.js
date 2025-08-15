// src/db/seeders.js
import { connect, getDB } from './config.js';
import { ObjectId } from 'mongodb';

async function seedDatabase() {
  try {
    // Conectar a la BD
    await connect();
    const db = getDB();

    // Limpiar colecciones
    await db.collection('usuarios').deleteMany({});
    await db.collection('recetas').deleteMany({});
    await db.collection('ingredientes').deleteMany({});

    // Insertar usuarios
    const usuarios = [
      {
        _id: new ObjectId("689dd0440a7beb0cbed3a0ca"),
        id: 1,
        nombre: "Pedro Gonzales",
        recetas: [
          {
            titulo: "Ensalada fresca",
            descripcion: "Ensalada de lechuga y tomate.",
            ingredientes: ["lechuga", "tomate"]
          },
          {
            titulo: "Ensalada fresca",
            descripcion: "Ensalada de lechuga y tomate.",
            ingredientes: ["lechuga", "tomate"]
          }
        ]
      },
      {
        _id: new ObjectId(),
        id: 2,
        nombre: "Maria Lopez",
        recetas: [
          {
            titulo: "Sopa de verduras",
            descripcion: "Caldo con vegetales frescos.",
            ingredientes: ["zanahoria", "papa", "cebolla"]
          }
        ]
      },
      {
        _id: new ObjectId(),
        id: 3,
        nombre: "Juan Perez",
        recetas: []
      }
    ];
    await db.collection('usuarios').insertMany(usuarios);

    // Insertar recetas
    const recetas = [
      {
        _id: new ObjectId("689e81bb339a23e17cdb9e61"),
        id: 1,
        titulo: "Arroz con pollo",
        descripcion: "Plato tradicional con arroz, pollo y verduras.",
        ingredientes: ["arroz", "pollo", "pimiento", "guisantes", "sardinas"],
        createdAt: new Date("2025-08-15T00:39:23.830Z")
      },
      {
        _id: new ObjectId(),
        id: 2,
        titulo: "Lentejas estofadas",
        descripcion: "Lentejas con verduras y chorizo.",
        ingredientes: ["lentejas", "zanahoria", "papa", "chorizo"],
        createdAt: new Date()
      },
      {
        _id: new ObjectId(),
        id: 3,
        titulo: "Ensalada de frutas",
        descripcion: "Mezcla fresca de frutas tropicales.",
        ingredientes: ["mango", "piña", "papaya", "banana"],
        createdAt: new Date()
      }
    ];
    await db.collection('recetas').insertMany(recetas);

    // Insertar ingredientes
    const ingredientes = [
        { id: 1, nombre: "lechuga", descripcion: "Vegetal verde para ensaladas." },
        { id: 2, nombre: "tomate", descripcion: "Fruto rojo, usado en ensaladas y salsas." },
        { id: 3, nombre: "arroz", descripcion: "Cereal básico en muchas cocinas." },
        { id: 4, nombre: "pollo", descripcion: "Carne blanca versátil y nutritiva." },
        { id: 5, nombre: "pimiento", descripcion: "Hortaliza dulce o picante." },
        { id: 6, nombre: "guisantes", descripcion: "Legumbre verde y dulce." },
        { id: 7, nombre: "zanahoria", descripcion: "Raíz naranja, rica en betacaroteno." },
        { id: 8, nombre: "papa", descripcion: "Tubérculo versátil para múltiples recetas." },
        { id: 9, nombre: "chorizo", descripcion: "Embutido de carne de cerdo condimentada." },
        { id: 10, nombre: "mango", descripcion: "Fruta tropical dulce y jugosa." }
    ];
    await db.collection('ingredientes').insertMany(ingredientes);

    console.log("✅ Base de datos sembrada con éxito.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error al sembrar la base de datos:", err);
    process.exit(1);
  }
}

seedDatabase();
