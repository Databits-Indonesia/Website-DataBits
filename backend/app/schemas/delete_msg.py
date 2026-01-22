from pydantic import BaseModel, Field

class DeleteMSG(BaseModel):
    message: str = Field(
        ...,
        description="Pesan setelah data dihapus"
    )