/**
 * Effectue un appel API avec les paramètres fournis.
 *
 * @param {string} url - L'URL de l'API.
 * @param {string} method - La méthode HTTP (GET, POST, PUT, etc.).
 * @param {Object} [data=null] - Les données à envoyer avec la requête (null si aucune donnée n'est requise).
 * @param {string|null} [authToken=null] - Le token, si nécessaire.
 * @returns {Promise<Object>} - Une promesse avec les données de la réponse JSON de l'API.
 * @throws {Error} - Une erreur si la requête échoue.
 */

import { mockTableData } from "../utils/tableData";


export async function callApi(url, employeeData) {
    try {
      const response = await fetch(mockTableData);
      if (!response.ok) {
        throw new Error("Erreur lors de la promesse");
       }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  