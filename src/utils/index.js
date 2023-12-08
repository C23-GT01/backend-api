const mapDBToModel = ({
  id,
  name,
  image,
  price,
  description,
  production,
  contribution,
  category,
  created_at,
  updated_at,
}, umkm, resources, impact) => ({
  id,
  name,
  image,
  price,
  description,
  resources,
  production,
  impact,
  contribution,
  umkm,
  category,
  createdAt: created_at,
  updatedAt: updated_at,
});

const mapResourceToModel = ({
  id,
  name,
  image,
  location,
  umkm,
  description,
  created_at,
  updated_at,
}) => ({
  id,
  name,
  image,
  location,
  umkm,
  description,
  createdAt: created_at,
  updatedAt: updated_at,
});

const mapImpactToModel = ({
  id,
  name,
  image,
  description,
  is_approve,
  created_at,
  updated_at,
}) => ({
  id,
  name,
  image,
  description,
  isApprove: is_approve,
  createdAt: created_at,
  updatedAt: updated_at,
});

const mapImpactToModelWithOwner = ({
  id,
  name,
  image,
  description,
  is_approve,
  owner,
  created_at,
  updated_at,
}) => ({
  id,
  name,
  image,
  description,
  isApprove: is_approve,
  owner,
  createdAt: created_at,
  updatedAt: updated_at,
});

const mapUmkmToModel = ({
  id,
  image,
  logo,
  name,
  description,
  location,
  history,
  impact,
  contact,
  is_approve,
  owner,
  created_at,
  updated_at,
}) => ({
  id,
  image,
  logo,
  name,
  description,
  location,
  history,
  impact,
  contact,
  isApproved: is_approve,
  owner,
  createdAt: created_at,
  updatedAt: updated_at,
});

module.exports = {
  mapDBToModel,
  mapUmkmToModel,
  mapResourceToModel,
  mapImpactToModel,
  mapImpactToModelWithOwner,
};
