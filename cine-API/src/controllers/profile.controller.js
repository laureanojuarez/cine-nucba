export const updateProfile = async (req, res) => {
  try {
    const {nombre, apellido, fecha_nacimiento, pais, ciudad, biografia} =
      req.body;
  } catch (error) {
    res.status(500).json({message: "Error al actualizar el perfil"});
  }
};
