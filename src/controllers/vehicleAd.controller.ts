import { Request, Response } from 'express';
import db from '../config/db.config';
import { AuthenticatedRequest, RequestWithNameAndEmail, VehicleAdAttributes } from '../utils/interfaces';
import { sendEmailToPurchaser, generateConditions, checkIsModeratorOrAdmin } from '../utils/helper';

const VehicleAd = db.vehicleAd;
export const createVehicleAd = (req: AuthenticatedRequest, res: Response) => {
  const vehicleAd = {
    name: req.body.name,
    type: req.body.type,
    color: req.body.color,
    year: req.body.year,
    userId: req.userId,
    price: req.body.price,
  };

  VehicleAd.create(vehicleAd)
    .then((data: VehicleAdAttributes) => {
      res.status(201).send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating a vehicle ad.',
      });
    });
}

export const findAll = (req: Request, res: Response) => {
  VehicleAd.findAll()
    .then((data: VehicleAdAttributes[]) => {
      res.status(200).send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving all vehicle ads.',
      });
    });
}

export const findAllUserVehicleAds = (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;

  VehicleAd.findAll({
    where: { userId },
    attributes: { exclude: ['userId'] },
  })
    .then((data: VehicleAdAttributes[]) => {
      res.status(200).send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving user's vehicle ads.",
      });
    });
}

export const findById = (req: Request, res: Response) => {
  const id = req.params.id;

  VehicleAd.findByPk(id, {
    include: db.user,
    attributes: { exclude: ['userId'] },
  })
    .then((data: VehicleAdAttributes | null) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          message: `Cannot find vehicle ad with id=${id}.`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while retrieving specific vehicle ad.',
      });
    });
}

export const updateVehicleAd = (req: AuthenticatedRequest, res: Response) => {
  const id = +req.params.id;
  const newObject = req.body;
  if (id !== req.userId) {
    res.status(403).send({ message: "You do not have permission to update this Ad!" })
    return
  }
  VehicleAd.update(newObject, { where: { id: id } })
    .then((num: number[]) => {
      if (num[0] == 1) {
        res.send({
          message: 'Vehicle ad was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update vehicle ad with id=${id}.`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating vehicle ad's data.",
      });
    });
}

export const findAllWithFilters = (req: Request, res: Response) => {
  VehicleAd.findAll({
    where: generateConditions(req.query),
    attributes: { exclude: ['userId'] },
  })
    .then((data: VehicleAdAttributes[]) => {
      res.status(200).send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while retrieving filtered vehicle ads.',
      });
    });
}

const handleDelete = (id: string, res: Response, onSuccess: () => void) => {
  VehicleAd.destroy({ where: { id: id } })
    .then((num: number) => {
      if (num === 1) {
        onSuccess();
      } else {
        res.send({
          message: `Cannot delete Vehicle ad with id=${id}.`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while deleting vehicle ad.',
      });
    });
}

export const purchaseVehicleAd = (req: RequestWithNameAndEmail, res: Response) => {
  const id = req.params.id;
  const purchaserEmail = req.email;
  const purchaserName = req.first_name;

  handleDelete(id, res, () => {
    if (purchaserEmail) sendEmailToPurchaser(purchaserEmail, purchaserName);
    res.send({
      message: 'Vehicle ad was deleted successfully!',
    });
  });
}

export const deleteVehicleAd = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id;
  let adCreatorId: Number | undefined;
  
  VehicleAd.findByPk(id, {
    attributes: ['userId'],
  })
    .then((data: VehicleAdAttributes | null) => {
      adCreatorId = data?.userId
    }).catch((error: Error) => {
      console.error("Error fetching VehicleAd:", error);
    });

  if (req.userId !== adCreatorId && !(await checkIsModeratorOrAdmin(req.userId))) {
    res.status(403).send({ message: 'You do not have permission to delete this ad!' })
    return
  }

  handleDelete(id, res, () => {
    res.send({
      message: 'Vehicle ad was deleted successfully!',
    });
  });
}

