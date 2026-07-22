import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaveService } from './save.service';
import { CreateSaveDto } from './dto/create-save.dto';
import { UpdateSaveDto } from './dto/update-save.dto';

@Controller('save')
export class SaveController {
  constructor(private readonly saveService: SaveService) {}

  // @Post()
  // create(@Body() createSaveDto: CreateSaveDto) {
  //   return this.saveService.create(createSaveDto);
  // }

  // @Get()
  // findAll() {
  //   return this.saveService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.saveService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSaveDto: UpdateSaveDto) {
  //   return this.saveService.update(id, updateSaveDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.saveService.remove(id);
  // }
}
