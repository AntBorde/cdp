export interface Project {
  project_id: number;
  name: string;
  description: string,
  git : string,
  productOwner: ProductOwner
}

export interface ProductOwner {
  firstname: string,
  lastname: string
}
