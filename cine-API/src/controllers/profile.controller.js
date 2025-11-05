import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const {nombre, apellido, fecha_nacimiento, pais, ciudad, biografia} =
      req.body;

    const userId = User.findByPk(req.user.id);

    if (!userId) {
      return res.status(404).json({message: "Usuario no encontrado"});
    }

    await User.update(
      {
        nombre,
        apellido,
        fecha_nacimiento,
        pais,
        ciudad,
        biografia,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    res.status(200).json({message: "Perfil actualizado correctamente"});
  } catch (error) {
    res.status(500).json({message: "Error al actualizar el perfil"});
  }
};
